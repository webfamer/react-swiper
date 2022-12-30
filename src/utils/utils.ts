export const getGroupingData = (data: any[], val: number) => {
    let groupData: any[] = [];
    for (let i = 0; i < data.length; i += Number(val)) {
      const newData = data.slice(i, i + Number(val));
      groupData.push(newData);
    }
    return groupData;
  };
  
  export const waitTime = (time: number = 500) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };