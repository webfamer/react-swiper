import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { waitTime } from '@/utils/utils';
import { CSSTransition } from 'react-transition-group';
import {  IsubjectResponseList } from './data.d';
import './animate.less';

const personInfoData = [{
  subjectName: '课目一',
  finalTime: '11:10.12',
  violationTime: 2,
  tRank: 1,
},
{
  subjectName: '课目二',
  finalTime: '12:11.12',
  violationTime: 3,
  tRank: 2,
},
{
  subjectName: '课目三',
  finalTime: '13:11.10',
  violationTime: 0,
  tRank: 3,
}]
const PersonDetail = () => {
  const [subjectInfo, setSubjectInfo] = useState<IsubjectResponseList>({});
  const [btnValue, setbtnValue] = useState(0);
  const [visible, setvisible] = useState(true);
  const groupChangeTimer = () => {
    let count = 1;
    if (personInfoData.length === 1) return;
    let timer = setInterval(async () => {
      if (
        personInfoData.length > 0 &&
        count < personInfoData.length
      ) {
        setSubjectInfo(personInfoData[count]);
      }
      setvisible(false);
      await waitTime(1000);
      setvisible(true);
      setbtnValue(count);
      count =
        count >= personInfoData.length - 1 ? 0 : count + 1;
    }, 5000);
    return timer;
  };
  useEffect(() => {
    let timer = groupChangeTimer();
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className={`page-container ${styles.personDetail}`}>
      <div className={styles.scoreBox}>
        <div className={styles.tableTitle}>
          {personInfoData.map((item, index) => {
            return (
              <span
                className={btnValue === index ? styles.active : ''}
                style={{
                  minWidth:
                    personInfoData.length === 1 ? 121 : '',
                }}
              >
                {item.subjectName}
              </span>
            );
          })}
        </div>
        <CSSTransition
          in={visible}
          timeout={300}
          classNames="tableScale"
          unmountOnExit
        >
          <div className={styles.tableContent}>
            <div className={styles.tableItem}>
              <label>课目用时</label>
              <span>{subjectInfo?.finalTime}</span>
            </div>
            <div className={styles.tableItem}>
              <label>判罚次数</label>
              <span>{subjectInfo?.violationTime}</span>
            </div>
            <div className={styles.tableItem}>
              <label>排名</label>
              <span>{subjectInfo.tRank}</span>
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default PersonDetail;
