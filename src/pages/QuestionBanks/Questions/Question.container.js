import { Button, Form, Input, Modal, Radio, Select, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../components/Loading/Loading.component";
import { OPTION_ANSWER_KEY } from "../../../constants";
import { SearchContext } from "../../../contexts/SearchContext";
import { deleteData, editData, fetchAllData, fetchDetailData, postData } from "./Question.handler";

import styles from "./Question.module.css";
const Question = () => {
  const { idBank } = useParams();
  const { loadingAdd, setLoadingAdd, loadingDelete, setLoadingDelete, loadingUpdate, setLoadingUpdate } = useContext(SearchContext);
  const [form] = useForm();
  const [datas, setDatas] = useState([]);
  const [question, setQuestion] = useState({});
  const [index, setIndex] = useState(0);
  const [idQuestion, setIdQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const getAllData = async () => {
    setLoading(true);
    const response = await fetchAllData(idBank);
    setDatas(response.data.data);
    setLoading(false);
  };

  const getDetailData = async (id) => {
    setLoading(true);
    const response = await fetchDetailData(id);
    setQuestion(response.data.data);
    setLoading(false);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoadingAdd(true);
      await postData(idBank, values, form);
      await getAllData();
      setLoadingAdd(false);
    } catch (error) {
      setLoadingAdd(false);
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    setLoadingDelete(true);
    await deleteData(id);
    setIndex(0);
    await getAllData();
    setLoadingDelete(false);
  };

  const handleUpdate = async (id) => {
    setIdQuestion(id);
    const res = await fetchDetailData(id);
    await form.setFieldsValue({
      answerKey: res.data.data.answer_key,
      private: res.data.data.is_private,
      question: res.data.data.question,
      a: res.data.data.a,
      b: res.data.data.b,
      c: res.data.data.c,
      d: res.data.data.d,
      e: res.data.data.e,
    });
  };

  const onUpdateData = async () => {
    setLoadingUpdate(true);
    const values = await form.validateFields();
    console.log(values);
    await editData(idQuestion, values, form, setUpdateModal);
    await getDetailData(idQuestion);
    setLoadingUpdate(false);
  };

  const title = datas[0]?.questionBank?.name;

  useEffect(() => {
    getAllData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.sidebar}>
        <div className={styles.questionWrapper}>
          {loading ? (
            "Wait loading..."
          ) : (
            <>
              <div className={styles.box}>
                <p className={styles.titleQuestion}>{title}</p>
                <div className={styles.questionGrid}>
                  <span className={index === 0 ? `${styles.questionBox} ${styles.active}` : styles.questionBox} onClick={() => setIndex(0)}>
                    +
                  </span>
                  {datas?.map((item, idx) => (
                    <span
                      className={idx + 1 === index ? `${styles.questionBox} ${styles.active}` : styles.questionBox}
                      key={item.id}
                      onClick={() => {
                        setIndex(idx + 1);
                        getDetailData(item.id);
                      }}
                    >
                      {idx + 1}
                    </span>
                  ))}
                </div>
              </div>
              <div className={styles.btnWrapper}>
                <button className={styles.btn} disabled>
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={styles.questionWrapper}>
        <div className={styles.questionHeader}>
          <div className={styles.formHeader}>{index === 0 ? <h1>Add Question</h1> : <p>Question {index}</p>}</div>
        </div>
        <div className={styles.questionBody}>
          {loading ? (
            <div className={styles.loadingWrapper}>
              <p>Wait...still process</p>
            </div>
          ) : (
            <>
              {index === 0 ? (
                <Form form={form} layout="vertical">
                  <Form.Item label="Question" name="question" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Option A" name="a" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Option B" name="b">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Option C" name="c">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Option D" name="d">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Option E" name="e">
                    <Input />
                  </Form.Item>

                  <Form.Item label="Answer Key" name="answerKey" rules={[{ required: true }]}>
                    <Select options={OPTION_ANSWER_KEY} />
                  </Form.Item>
                  <Form.Item label="Private" name="private" rules={[{ required: true }]}>
                    <Radio.Group>
                      <Radio value={false}>0</Radio>
                      <Radio value={true}>1</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Form>
              ) : (
                <>
                  <div className={styles.questionBoxs}>
                    <p>{question.question}</p>
                  </div>
                  <div className={styles.formGroup}>
                    <Radio.Group name="radiogroup" defaultValue={question.a}>
                      <Space direction="vertical">
                        <Radio value={"a"} style={{ marginBottom: "10px" }}>
                          <p>A. {question.a}</p>
                        </Radio>
                        <Radio value={"b"} style={{ marginBottom: "10px" }}>
                          <p>B. {question.b}</p>
                        </Radio>
                        <Radio value={"c"} style={{ marginBottom: "10px" }}>
                          <p>C. {question.c}</p>
                        </Radio>
                        <Radio value={"d"} style={{ marginBottom: "10px" }}>
                          <p>D. {question.d}</p>
                        </Radio>
                        <Radio value={"e"} style={{ marginBottom: "10px" }}>
                          <p>E. {question.e}</p>
                        </Radio>
                      </Space>
                    </Radio.Group>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className={styles.questionFooter}>
          {loading ? (
            ""
          ) : (
            <>
              {index === 0 ? (
                <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                  <Button type="primary" onClick={handleSubmit} loading={loadingAdd}>
                    Submit
                  </Button>
                </div>
              ) : (
                <>
                  <p>
                    Answer key: <strong>{question.answer_key}</strong>
                  </p>
                  <div className={styles.btnGroup}>
                    <Button
                      loading={loadingUpdate}
                      onClick={() => {
                        handleUpdate(question.id);
                        setUpdateModal(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button type="primary" danger loading={loadingDelete} onClick={() => handleDelete(question.id)}>
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <Modal
        title="Update Question"
        open={updateModal}
        onOk={onUpdateData}
        confirmLoading={loadingUpdate}
        onCancel={() => {
          form.resetFields();
          setUpdateModal(false);
        }}
      >
        {loadingUpdate ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Loading />
          </div>
        ) : (
          <Form form={form} layout="vertical">
            <Form.Item label="Question" name="question" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Option A" name="a" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Option B" name="b">
              <Input />
            </Form.Item>
            <Form.Item label="Option C" name="c">
              <Input />
            </Form.Item>
            <Form.Item label="Option D" name="d">
              <Input />
            </Form.Item>
            <Form.Item label="Option E" name="e">
              <Input />
            </Form.Item>

            <Form.Item label="Answer Key" name="answerKey" rules={[{ required: true }]}>
              <Select options={OPTION_ANSWER_KEY} />
            </Form.Item>
            <Form.Item label="Private" name="private" rules={[{ required: true }]}>
              <Radio.Group>
                <Radio value={false}>0</Radio>
                <Radio value={true}>1</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default Question;
