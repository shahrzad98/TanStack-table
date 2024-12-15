import { Card, Checkbox, Layout, Space } from "antd";
import { Form, Formik, FormikProps } from "formik";
import { DivoButton, DivoFormItem, notification } from "~/components";
import LockIcon from "~/modules/icons/Lock";
import DivNotesLogo from "~/modules/icons/DivnotesLogo";
import { useEffect, useRef } from "react";
import { useAuth, useSignIn } from "@clerk/clerk-react";
import { isClerkAPIResponseError } from "@clerk/clerk-react/errors";
import userStore from "~/stores/userStore";
import { ISignInForm, IUserStore } from "~/types/user";
import { tryToCatch } from "~/helpers/tryToCatch";
import { useNavigate, useSearchParams } from "@remix-run/react";
import { getMe } from "~/api/handler/employees";
import styles from "~/styles/signin.module.scss";
import { SignInSchema } from "~/validation/signin.schema";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export function meta() {
  return [
    {
      title: "Sign In",
    },
  ];
}

const SignIn = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const formRef = useRef<FormikProps<ISignInForm> | null>(null);

  const { isLoaded, isSignedIn } = useAuth();
  const { signIn } = useSignIn();

  const setUser = userStore((state: IUserStore) => state.setUser);
  const currentUser = userStore((state: IUserStore) => state.currentUser);
  const userId = currentUser?.data.id;
  const signInFormInitialValues: ISignInForm = {
    email: "",
    password: "",
    remember: false,
  };
  const expireAfterSixHours = new Date().getTime() + 1000 * 60 * 60 * 6;
  const expireAfterSevenDays = new Date().getTime() + 1000 * 60 * 60 * 24 * 7;
  useEffect(() => {
    if (isSignedIn) {
      navigate("/");
    }
  }, [isSignedIn, userId]);

  const handleSignIn = async (values: ISignInForm) => {
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn!.create({
        identifier: values.email,
        password: values.password,
      });
      if (result.status === "complete") {
        // await setActive({ session: result.createdSessionId });

        const [userData, error] = await tryToCatch(getMe);

        error && notification.error(`${error.message}`);

        if (userData) {
          setUser({
            ...userData,
            expiry: values.remember
              ? expireAfterSevenDays
              : expireAfterSixHours,
          });

          navigate(searchParams.get("redirect_url") || "/");
        } else {
          notification.error("Something Went Wrong.");
        }
      } else {
        notification.error("Something Went Wrong.");
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        notification.error(
          (err.errors[0].longMessage || err.errors[0].message) as string,
        );
      } else {
        notification.error("Something Went Wrong.");
      }
    }
  };
  return isSignedIn && userId ? null : (
    <>
      <Layout className={styles.layout}>
        <Card className={styles.card}>
          <Space className={styles.header}>
            <div>
              <DivNotesLogo className={styles.logo} />
              <h1>DivOperations</h1>
            </div>
            <LockIcon />
          </Space>
          <Formik
            innerRef={formRef}
            initialValues={signInFormInitialValues}
            validationSchema={SignInSchema}
            onSubmit={handleSignIn}
            validateOnMount
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form
                className={`ant-form ant-form-vertical css-dev-only-do-not-override-ixblex ${styles.form}`}
              >
                <DivoFormItem name="email" title="Email" required />
                <DivoFormItem name="password" label="Password" required />
                <Space className={styles.checkbox}>
                  <Checkbox name="remember">Remember me?</Checkbox>
                </Space>
                <DivoButton
                  variant="primary"
                  htmlType="submit"
                  loading={isSubmitting}
                >
                  Sign In
                </DivoButton>
              </Form>
            )}
          </Formik>
        </Card>
      </Layout>
    </>
  );
};

export default SignIn;
