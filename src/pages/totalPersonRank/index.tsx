import React, { useContext, useEffect, useState, useRef } from 'react';
import styles from './index.less';
import { IallRank, IhitDetailResponseList, IsubjectScores } from '../../data.d';

import {rankData} from './data'
const PersonRank = () => {
  const [listData, setListData] = useState<IallRank[]>([]);
  const tableDiv = useRef<HTMLDivElement>(null);
  const tableDiv2 = useRef<HTMLDivElement>(null);
  const tableContainer = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timer | null>(null);
  useEffect(() => {
    if (rankData) {
      const personAllRank = rankData;
      if (personAllRank?.length > 0) {
        if (personAllRank.length % 8 !== 0) {
          let restNum = 8 - (personAllRank.length % 8);
          for (let i = 0; i < restNum; i++) {
            personAllRank.push({
              delegation: '',
              tRank: '',
              score: '',
              departmentName: '',
              staffName: '',
            });
          }
        }
        setListData(rankData);
      }
    }
  }, [rankData]);
  const startScroll = () => {
    let count = 0;
    let value = 0;
    setTimeout(() => {
      if (tableDiv.current && tableDiv2.current)
        tableDiv2.current.innerHTML = tableDiv.current.innerHTML;
    }, 1000);
    function scrollTable() {
      timerRef.current = setInterval(() => {
        count -= 4; //4像素滚动
        if (tableContainer.current && tableDiv.current) {
          tableContainer.current.style.transform = `translateY(${count}px)`;
          value = Number(
            tableContainer.current.style.transform.match(/\-?[0-9]+/g),
          );
          if (parseInt(String(value)) <= -tableDiv.current?.offsetHeight) {
            count = 0;
          }
        }
        if (parseInt(String(value)) % 712 === 0 && timerRef.current) {
          clearInterval(timerRef.current);
          setTimeout(() => {
            scrollTable();
          }, 5000);
        }
      }, 10);
    }
    scrollTable();
    return timerRef.current;
  };
  useEffect(() => {
    let timer = setTimeout(() => {
      startScroll();
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, [tableDiv.current]);
  return (
    <div className={styles.personRank}>
      <div className={styles.tableTitle}>
        <span>排名</span>
        <span>姓名</span>
        <span style={{ width: 300 }}>所属单位</span>
        <span style={{ marginLeft: 30, width: 164 }}>总分</span>
      </div>
      <div className={styles.tableContent}>
        <div ref={tableContainer}>
          <div
            className={styles.table}
            ref={tableDiv}
          >
            {listData.map((item, index) => {
              return (
                <div
                  className={`${styles.tableItem} ${item.delegation === '' ? styles.hiddenTableItem : ''
                    }`}
                  key={index}
                >
                  <span>{item.tRank}</span>
                  <span>{item.staffName}</span>
                  <span style={{ width: 300 }}>{item.departmentName}</span>
                  <span style={{ marginLeft: 30, width: 164 }}>
                    {item.score}
                  </span>
                </div>
              );
            })}
          </div>
          <div className={styles.table} ref={tableDiv2}></div>
        </div>
      </div>
    </div>
  );
};

export default PersonRank;
