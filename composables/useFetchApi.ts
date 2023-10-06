// import { useOptions } from '@/stores/options';
// import { useUserInfo } from "@/stores/userInfo";
interface etc {
  count: number
  filename: string
  useYcount?: number
  useNcount?: number
}

export default async <T>(apiUrl: string, opts: {
  method: any
  params?: URLSearchParams | object | undefined
  body?: BodyInit | Record<string, any> | null | undefined
}, isUri: boolean = true) => {
  const { VITE_BASE_URL } = import.meta.env;
//   const useOption = useOptions();
//   const userInfo = useUserInfo();
  const etcObj: etc = {
    count: 0,
    filename: "",
    useYcount: 0,
    useNcount: 0,
  }

  const fetchData = await useFetch <T> (apiUrl, {
    baseURL: isUri ? VITE_BASE_URL : '',
    method: opts.method,
    params: {...opts?.params },  //uuid: `uuid_${Math.round(Math.random()*1000000)}`
    // params: opts?.params,
    body: opts?.body,
    mode: 'no-cors',
    redirect: "follow",
    cache: "no-store",
    onRequest({ request, options }) {
        console.log(`[useApiReq] : 전송`);
        console.log(request)
      options.headers = {...options.headers, "Access-Control-Allow-Origin": "*"};
    },
    onRequestError({ request, options, error }) {
      console.log(`[useApiReq] : req 오류 발생`);
      console.log(error);
    },
    onResponse({ request, response, options }) {
    //   useOption.offLoading();
    console.log(`[useApiRes] : Res 데이터`);
    console.log(response)
      if(response.headers.get("X-Total-Count")){
        etcObj.count = Number(response.headers.get("X-Total-Count") || "0")
      }
      if(response.headers.get("Content-Disposition")){
        const str = response.headers.get("Content-Disposition") || ""
        etcObj.filename = extractQuotes(str) || "";
      }
      if(response.headers.get("Use-Y-Count")){
        etcObj.useYcount = Number(response.headers.get("Use-Y-Count") || "0")
      }
      if(response.headers.get("Use-N-Count")){
        etcObj.useNcount = Number(response.headers.get("Use-N-Count") || "0")
      }
      if(response.headers.get("X-Use-Count")){
        etcObj.useYcount = Number(response.headers.get("X-Use-Count") || "0")
      }
      if(response.headers.get("X-Not-Use-Count")){
        etcObj.useNcount = Number(response.headers.get("X-Not-Use-Count") || "0")
      }
      if (response.redirected) {
        // useOption.setLastPathChg(false)
        // userInfo.setLogin(false)
        window.location.href = response.url
      }
    },
    onResponseError({ request, response, options }) {
    //   useOption.offLoading();
      console.log(`[useApiReq] : res 오류 발생`);
      console.log(`[useApiReq] : ${response.status}`);
    },
  });

  console.log( {...fetchData, ...etcObj})

  return {...fetchData, ...etcObj}
}
