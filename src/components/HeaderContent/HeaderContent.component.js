import { faCircleXmark, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'antd'
import React, { useContext } from 'react'
import { SearchContext } from '../../contexts/SearchContext'

import styles from "./HeaderContent.module.css"
const HeaderContent = ({stateAddModal}) => {
    const {search, setSearch} = useContext(SearchContext)
  return (
    <div className={styles.headerWrap}>
        <Button type="primary" className={`${styles.btn}`} onClick={() => stateAddModal(true)}>
          <FontAwesomeIcon icon={faPlus} style={{ fontSize: "12px", marginRight: "5px" }} /> <span style={{ fontSize: "12px" }}>Add</span>
        </Button>
        {!search ? (
          ""
        ) : (
          <div className={styles.filterWrap}>
            <p>Filtered: </p>
            <span className={styles.filter} onClick={() => setSearch("")}>
              {search} <FontAwesomeIcon icon={faCircleXmark} />
            </span>
          </div>
        )}
      </div>
  )
}

export default HeaderContent