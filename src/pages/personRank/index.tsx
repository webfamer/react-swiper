import {
  useEffect,
  useState,
  useRef,
} from 'react';
import styles from './index.less';
import { getGroupingData } from '@/utils/utils';
import {
  IhitResponseList,
} from '../../data.d';
import { defalutData } from './data'
const PersonRank = () => {
  const [storeData, setStoreData] = useState<IhitResponseList[]>([]);
  const listGroupData = useRef<IhitResponseList[][]>([[]]); //8个一组把数据分组
  const timerRef = useRef<Nodejs.Timer>(null);
  const Firstflag = useRef<boolean>(false);
  useEffect(() => {
    const filterData = defalutData.filter(
      (item) => item.score,
    );
    if (filterData.length % 8 !== 0) {
      let restNum = 8 - (filterData.length % 8);
      for (let i = 0; i < restNum; i++) {
        filterData.push({
          staffName: '',
          departmentName: '',
          tRank: '',
          score: '',
          staffId: String(i),
        });
      }
    }
    //存储分组
    const tournameGroupData = getGroupingData(filterData, 8);
    listGroupData.current = tournameGroupData;
  }, []);
  useEffect(() => {
    Firstflag.current = true;
  }, []);
  useEffect(() => {
    reduceGroupData(listGroupData.current);
  }, []);
  const startAnimation = (data: IhitResponseList[]) => {
    let count = 0;
    if (data && data.length > 0) {
      let timer = setInterval(async () => {
        setStoreData((val) => {
          let newVal = JSON.parse(JSON.stringify(val));
          console.log(newVal, 'newVal')
          if (data[count]) {
            newVal[count] = data[count];
          }
          return newVal;
        });
        count++;
        if (count > 7) {
          clearInterval(timer);
          count === 0;
        }
      }, 250);
    }
  };
  const reduceGroupData = (groupArr: IhitResponseList[][]) => {
    let count = 0;
    if (groupArr.length > 0) {
      if (Firstflag.current) {
        startAnimation(groupArr[count]);
      }
      if (groupArr.length === 1) return;
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      timerRef.current = setInterval(() => {
        count = count === groupArr.length - 1 ? 0 : count + 1;
        startAnimation(groupArr[count]);
      }, 10000);
    }
  };
  return (
    <div className={styles.personRank}>
      <div className={styles.table}>
      <div className={styles.tableTitle}>
        <span>排名</span>
        <span>姓名</span>
        <span style={{ width: 300 }}>所属单位</span>
        <span>得分</span>
      </div>
      <div className={styles.tableContent}>
        <div>
          <div className={styles.table}>
            {storeData.map((item, index) => {
              return (
                <div
                  className={`${styles.tableItem} ${item.staffName ? '' : styles.hideTable
                    } ${styles.fadeInOut}`}
                  key={item?.staffId}
                >
                  <span className={styles.rankLogoBg}>{item?.tRank}</span>
                  <span>{item.staffName}</span>
                  <span style={{ width: 300 }}>{item.departmentName}</span>
                  <span>{item.score}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default PersonRank;
