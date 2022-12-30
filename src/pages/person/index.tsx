import React, { useEffect, useState, useRef } from 'react';
import styles from './index.less';
import { IstaffInfoResponses } from './data.d';
import line from '@/assets/images/line.png';
import headLogo from '@/assets/images/headLogo.webp';
import {personData} from './data'



const Person = () => {
  const [staffInfo, setStaffInfo] = useState<IstaffInfoResponses[]>([
    {
      teamName: '',
      staffInfoList: [],
    },
  ]);
  const [step, setStep] = useState(0);
  const getClassName = (index: number) => {
    if (index <= step - 1) {
      return styles.left;
    } else if (index === step) {
      return styles.center;
    } else if (index >= step + 1) {
      return styles.right;
    }
  };
  const startSwiper = () => {
    let count = 1;
    let timer = setInterval(async () => {
      console.log(count,'切换count')
      setStep(count);
      //无缝切换，缩短0-1的切换间隔
      if (count === 0) {
        count = 1;
        setTimeout(() => {
          setStep(1);
        }, 500);
      }
      count = count > personData.length - 1 ? 0 : count + 1;
    }, 3000);
    return timer;
  };


  useEffect(() => {
    let timer = startSwiper();
    return () => {
      clearInterval(timer);
    };
  }, []);
  useEffect(() => {
    setStaffInfo([...personData,personData[0]])
  }, []);
  return (
    <div className={`page-container ${styles.personBg}`}>
      {staffInfo.map((staffInfoItem, index) => {
        return (
          <div
            className={`${getClassName(index)} ${styles.flexCenter} ${
              step === 0 ? '' : styles.transiton
            }`}
          >
            <div className={styles.title}>
              <p>{staffInfoItem?.teamName}</p>
              <img src={line} alt="" />
            </div>
            <div className={styles.personContent}>
              {staffInfoItem?.staffInfoList?.map((item) => {
                return (
                  <div
                    className={`${styles.personBox} ${
                      staffInfoItem?.staffInfoList?.length > 8
                        ? styles.ninePersonBox
                        : styles.eightPersonBox
                    }`}
                  >
                    <div>
                      <img
                        src={`${item.picture ? item.picture : headLogo}`}
                        alt=""
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <div className={styles.info}>
                      <div className={styles.infoItem}>
                        <span className={styles.point}></span>
                        <span>
                          {item?.staffName}&emsp;{item?.age}岁
                        </span>
                      </div>
                      <div className={styles.infoItem}>
                        <span className={styles.point}></span>
                        <span>{item?.departmentName}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Person;
