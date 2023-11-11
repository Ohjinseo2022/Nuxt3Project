/**
 * "" 안의 글자 추출
 * @param str
 * @returns {string "" 안의 글자}
 */
export const extractQuotes = (str: string): string => {
  const regex = /"([^"]*)"/;
  const match = str.match(regex);

  if (match && match[1]) {
    return match[1];
  }
  return "";
};

/**
 *str 한글제외 삭제
 * @param str
 * @returns {str 한글제외 삭제}
 */
export const removeNonKorean = (str: string): string => {
  return str.replace(/[^가-힣 ㄱ-ㅎ ㅏ-ㅣ]/gi, "");
};

/**
 *str 한글여부
 * @param str
 * @returns {boolean 한글여부}
 */
export const isKorean = (str: string): boolean => {
  const regexp = /[가-힣 ㄱ-ㅎ ㅏ-ㅣ]/g;
  return regexp.test(str);
};

/**
 *str 한글 삭제
 * @param str
 * @returns {str 한글 삭제}
 */
export const removeKorean = (str: string): string => {
  return str.replace(/[가-힣 ㄱ-ㅎ ㅏ-ㅣ]/gi, "");
};

/**
 *str 대문자 여부
 * @param str
 * @returns {boolean 대문자여부}
 */
export const isCapitalLetter = (str: string): boolean => {
  const regexp = /[A-Z]/g;
  return regexp.test(str);
};

/**
 *str 대문자 삭제
 * @param str
 * @returns {str 대문자 삭제}
 */
export const removeCapitalLetter = (str: string): string => {
  return str.replace(/[A-Z]/g, "");
};

/**
 * 전화번호 정규식
 * @param phone
 * @returns {boolean 전화번호 정규식}
 */
export const isPhoneNumber = (phone: string): boolean => {
  const regexp = /^\d{3}-\d{3,4}-\d{4}$/;
  return regexp.test(phone);
};

/**
 * 이메일 정규식
 * @param email
 * @returns {boolean 이메일 정규식}
 */
export const isEmail = (email: string): boolean => {
  const regexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexp.test(email);
};

/**
 * 비밀번호 정규식1
 * @param password
 * @returns {boolean 영문, 숫자, 특수문자 포함한 8~20 자리 비밀번호 정규식}
 */
export const isPassword = (password: string): boolean => {
  // const regexp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  const regexp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/;
  return regexp.test(password);
};

/**
 * 비밀번호 정규식2
 * @param password
 * @returns {boolean 연속된 순서를 가진 문자,숫자 체크 비밀번호 정규식}
 */
export const isConsecutive = (password: string): boolean => {
  const regexp =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let count = 0;
  let index = -1;

  for (const str of password) {
    const idx = regexp.indexOf(str);

    if (idx - index === 1) {
      count++;
    } else {
      count = 0;
    }
    if (count >= 2) {
      return false;
    }
    index = idx;
  }
  return true;
};

/**
 * 비밀번호 정규식3
 * @param password
 * @returns {boolean 키보드 연속된 자판입력 체크 비밀번호 정규식}
 */
export const isConsecutiveKey = (password: string): boolean => {
  const keyboard = ["1234567890", "qwertyuiop", "asdfghjkl", "zxcvbnm"];
  for (let i = 0; i < password.length - 2; i++) {
    const sliceValue = password.substring(i, i + 3);
    // 모든 조건을 한번씩 순회
    if (keyboard.some((code) => code.includes(sliceValue))) {
      return false;
    }
  }
  // 모든 조건을 넘겼을 때
  return true;
};

/**
 * 이미지 파일
 * @param imageExt
 * @returns {boolean 이미지 파일인지 확인 하는 정규식}
 */
export const isImageFile = (imageExt: string): boolean => {
  const regexp = /\.(jpg|jpeg|png|gif)$/i;
  return regexp.test(imageExt);
};

/**
 * 가격 정규식
 * @param price
 * @returns {number 형태의 가격 정보 1000단위로 "," 추가한 string 변환 정규식}
 */
export const isPriceComma = (price: number): string => {
  if (isNaN(Number(price))) {
    return price.toString();
  }
  return price.toLocaleString();
  // return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
};

/**
 * 사업자등록번호 정규식
 * @param businessRegNum
 * @returns {boolean 사업자등록번호 인지 확인 하는 정규식}
 */
export const isBusinessRegNum = (businessRegNum: string): boolean => {
  const regexp = /^\d{10}$/;
  return regexp.test(businessRegNum);
};

/**
 * 법입등록번호  정규식
 * @param businessRegNum
 * @returns {boolean 법입등록번호  인지 확인 하는 정규식}
 */
export const isLegalRegNum = (legalRegNum: string): boolean => {
  const regexp = /^\d{13}$/;
  return regexp.test(legalRegNum);
};

/**
 *str 숫자 제외 삭제
 * @param str
 * @returns {str 숫자 제외 삭제}
 */
export const removeNonNumber = (str: string): string => {
  return str.replace(/[^0-9]/gi, "");
};

/**
 *str 문자 제외 삭제
 * @param str
 * @returns {str 문자 제외 삭제}
 */
export const removeNonString = (str: string): string => {
  return str.replace(/[0-9]/g, "");
};

/**
 * 특수문자체크 정규식
 * @param businessRegNum
 * @returns {boolean 사업자등록번호 인지 확인 하는 정규식}
 */
export const isSpecialCharacters = (specialCharacters: string): boolean => {
  const regexp = /[^a-zA-Z0-9ㄱ-힣]/g;
  return regexp.test(specialCharacters);
};

/**
 * 영문, 한글 제외 삭제
 * @param str
 * @returns {boolean 영문, 한글 제외 삭제}
 */
export const removeNonEnKr = (str: string): string => {
  const regex = /[^a-zA-Zㄱ-힣]/g;
  return str.replace(regex, "");
};

/**
 * 영문, 한글, 숫자 제외 삭제
 * @param str
 * @returns {boolean 영문, 한글, 숫자 제외 삭제}
 */
export const removeNonEnKrNum = (str: string): string => {
  const regex = /[^a-zA-Z0-9ㄱ-힣]/g;
  return str.replace(regex, "");
};

/**
 * ID 영문,숫자-,_ 제외 삭제
 * @param str
 * @returns {boolean ID 영문,숫자-,_ 제외 삭제}
 */
export const removeIDNonEnNum = (str: string): string => {
  const regex = /[^a-zA-Z0-9-_]/g;
  return str.replace(regex, "");
};

export const getBase64Str = () => {
  const htmlString = `
  <img src="data:image/png;base64,test2" alt="Base64 Image">
  <img src='data:image/jpeg;base64,test'>
  <img src="https://example.com/image.jpg" alt="External Image">
  `;

  const regex =
    /<img[^>]+src\s*=\s*['"]data:image\/[^;]+;base64,([^'"]+)['"][^>]*>/g;

  const matches = [];
  let match;
  while ((match = regex.exec(htmlString)) !== null) {
    matches.push(match[1]);
  }

  console.log(matches);
};

export const removeHtmlTag = (htmlString: string) => {
  return htmlString.replace(/<[^>]*>/g, "");
};

export const generateRandomString = (length: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
};

/**
 * @param wallpaper
 * @returns {반환되는 리턴값 정보를 한줄로 얘기해줌}
 */
export const solution = (wallpaper: string[]): number[] => {
  let answer: number[] = [];
  const lowArr: number[] = [];
  const colArr: number[] = [];
  wallpaper.forEach((item, i) => {
    item.split("").forEach((col, j) => {
      if (col === "#") {
        lowArr.push(i);
        colArr.push(j);
      }
    });
  });
  lowArr.sort((a, b) => a - b);
  colArr.sort((a, b) => a - b);
  if (lowArr.length > 0 && colArr.length > 0) {
    // answer = [lowArr[0], colArr[0], lowArr.at(-1) + 1, colArr.at(-1) + 1];
    answer = [
      lowArr[0],
      colArr[0],
      lowArr[lowArr.length - 1] + 1,
      colArr[colArr.length - 1] + 1,
    ];
  }
  return answer;
};

//프로그래머스 카드뭉치
//잘못된 풀이인가봐...
export const solution1 = (
  cards1: string[],
  cards2: string[],
  goal: string[]
) => {
  var answer = "Yes";
  let index = 0;
  let isfirst = true;
  let cnt = 0;
  while (index < goal.length) {
    if (isfirst) {
      //현재 있는 카드뭉치 맨위 카드의 단어와 현재 단어가 동일하다면
      if (cards1[0] === goal[index]) {
        cnt += 1;
        index += 1;
        cards1.shift();
      } else {
        //1개라도 사용하지 않았다면 루프를꺠고 no출력
        if (cnt === 0) {
          answer = "No";
          break;
        } else {
          //1개라도 카드뭉치를 사용했다면 2번째 카드뭉치를 확인하러 출발
          isfirst = !isfirst;
          //카드 사용횟수 초기화
          cnt = 0;
          continue;
        }
      }
    } else {
      if (cards2[0] === goal[index]) {
        cnt += 1;
        index += 1;
        cards2.shift();
      } else {
        //1개라도 사용하지 못했다면 루프를 깨고 No출력
        if (cnt === 0) {
          answer = "No";
          break;
        } else {
          isfirst = !isfirst;
          cnt = 0;
          continue;
        }
      }
    }
  }
  return answer;
};
