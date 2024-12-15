import { DivoFormItem, DivoLayout } from "../../../components";

import { Row, Image, Col } from "antd";
import { EmployeeSchema } from "../../../validation";
import { Formik } from "formik";
import { useQuery } from "@tanstack/react-query";
import { getEmployee } from "../../../api/handler/employees";
import { employeeKey } from "../../../utils/queryKeys";
import { useEffect, useState } from "react";
import { IEmployeeData } from "../../../types/employee";
import { useNavigate } from "@remix-run/react";

export const EmployeeSummary = () => {
  const { query } = useNavigate();
  const { data: employeeData } = useQuery(
    [employeeKey(query.id as string)],
    () => getEmployee(query?.employeeId as string),
    {
      select: (data) => data.data,
    },
  );
  const [initialValues, setInitialValues] = useState<IEmployeeData>();

  useEffect(() => {
    setInitialValues(employeeData);
  }, [employeeData]);
  function handleSubmit() {}

  return (
    <DivoLayout activeRoute="/employees" title={query.name as string}>
      <Formik
        enableReinitialize
        initialValues={initialValues ?? {}}
        validationSchema={EmployeeSchema}
        onSubmit={handleSubmit}
      >
        <Row>
          <Col span={7}>
            <Image
              width={336}
              alt="profile picture"
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </Col>
          <Col span={17}>
            <Row gutter={20}>
              <Col span={12}>
                <DivoFormItem name="user.first_name" label="Name" required />
              </Col>
              <Col span={12}>
                <DivoFormItem name="user.last_name" label="Surname" required />
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={12}>
                <DivoFormItem
                  name="role.name"
                  inputType="select"
                  label="Role"
                  options={[
                    { label: "Employee", value: "employee" },
                    { label: "Owner", value: "owner" },
                    { label: "Admin", value: "admin" },
                  ]}
                  required
                />
              </Col>
              <Col span={12}>
                <DivoFormItem
                  name="status"
                  inputType="select"
                  options={[
                    { label: "Active", value: "active" },
                    { label: "Inactive", value: "inactive" },
                  ]}
                  required
                />
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={8}>
                <DivoFormItem name="user.email" required />
              </Col>
              <Col span={8}>
                <DivoFormItem name="personal email" required />
              </Col>
              <Col span={8}>
                <DivoFormItem name="phone_number" label="Phone" required />
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={8}>
                <DivoFormItem name="birthday" required />
              </Col>
              <Col span={8}>
                <DivoFormItem name="date started" required />
              </Col>
              <Col span={8}>
                <DivoFormItem name="contract renewal date" />
              </Col>
            </Row>
          </Col>
        </Row>
      </Formik>
    </DivoLayout>
  );
};
