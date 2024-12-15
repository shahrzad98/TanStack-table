import { Col, Row } from "antd";
import { DivoFormItem } from "~/components";
import { Form, Formik } from "formik";

import { useQuery } from "@tanstack/react-query";
import { clientKey } from "~/utils/queryKeys";
import { getClient } from "~/api/handler/client";
import { useParams } from "@remix-run/react";

export const ClientInfo = () => {
  const params = useParams();
  const clientId = params.clientId;
  const { data: clientData } = useQuery({
    select: (data) => data.data,
    queryKey: [clientKey(clientId as string)],
    queryFn: () => getClient(clientId as string),
    enabled: !!clientId,
  });

  const initialValues = {
    name: clientData?.name,
    code: clientData?.code,
    color: clientData?.color,
    is_active: clientData?.is_active,
    contact_name: clientData?.contact_name,
    contact_email: clientData?.contact_email,
    contact_phone: clientData?.contact_phone,
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => undefined}
      enableReinitialize
    >
      <Form>
        <Row>
          <Col className="gutter-row" span={3}>
            <DivoFormItem
              name="logo_url"
              label="Client Logo"
              uploadTitle="a logo"
              inputType="upload"
              uploadSize={{ width: 126, height: 126 }}
            />
          </Col>
          <Col span={21}>
            <DivoFormItem name="name" label="Client Name" />
            <Row justify="end" gutter={20}>
              <Col span={7}>
                <DivoFormItem name="code" label="Client Code" />
              </Col>
              <Col span={10}>
                <DivoFormItem
                  name="color"
                  label="Client Color"
                  options={[{ value: "#8413D0FF", label: "#8413D0FF" }]}
                  inputType="select"
                />
              </Col>
              <Col span={7}>
                <DivoFormItem
                  name="is_active"
                  label="Status"
                  inputType="select"
                  options={[
                    { value: "true", label: "Active" },
                    { value: "false", label: "DeActive" },
                  ]}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row justify="end" gutter={20}>
          <Col span={8}>
            <DivoFormItem name="contact_name" label="Contact Name" />
          </Col>
          <Col span={8}>
            <DivoFormItem name="contact_email" label="Contact Email" />
          </Col>
          <Col span={8}>
            <DivoFormItem name="contact_phone" label="Contact Phone" />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DivoFormItem name="comments" inputType="textArea" />
          </Col>
        </Row>
      </Form>
    </Formik>
  );
};
