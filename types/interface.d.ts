export { };

declare global {
    type GlobalType = [boolean, string, number];
    //그리드용 인터페이스 
    interface dataItem {
        [key: string]: any;
        index:number;
        id: string;
        userName: string;
        col1: string;
        col2: string;
        col3: string;
        col4: string;
        col5: string;
        col6: string;
      }
      

}
