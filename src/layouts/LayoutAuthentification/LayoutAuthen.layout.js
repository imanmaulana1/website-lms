import React from "react";
import { Outlet } from "react-router-dom";

import styles from "./LayoutAuthen.module.css";
import logo from "../../assets/logo.svg";
import bg from "../../assets/bg.png";
import react from "../../assets/react.svg";
import js from "../../assets/js.svg";
import nodejs from "../../assets/nodejs2.svg";
import html from "../../assets/html.svg";
import css from "../../assets/css.svg";
import mongodb from "../../assets/mongodb.svg";

const LayoutAuthen = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.wrapper}>
            <div className={styles.headerForm}>
              <img src={logo} alt="logo" className={styles.image} />
              <h1 className={styles.headerText}>
                Dev<span className={styles.headerTextColor}>Edu</span>
              </h1>
            </div>
            <Outlet />
            <div className={styles.footerForm}>
              <p className={styles.footerText}>Join with millions of smart developer who trust us. Log in to access your personalized dashboard, track your assignments, and reading the materials.</p>
            </div>
          </div>
        </div>
        <div className={styles.logo}>
          <div className={styles.wrapImage}>
            <img src={bg} alt="" className={styles.bg} />
            <img src={react} alt="" className={`${styles.ava} ${styles.react}`} />
            <img src={js} alt="" className={`${styles.ava} ${styles.js}`} />
            <img src={nodejs} alt="" className={`${styles.ava} ${styles.nodejs}`} />
            <img src={html} alt="" className={`${styles.ava} ${styles.html}`} />
            <img src={css} alt="" className={`${styles.ava} ${styles.css}`} />
            <img src={mongodb} alt="" className={`${styles.ava} ${styles.mongodb}`} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutAuthen;
