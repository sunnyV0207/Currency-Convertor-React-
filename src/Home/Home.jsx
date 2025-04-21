import React, { useEffect } from 'react'
import "./Home.css"
import { useState } from 'react'
import axios from 'axios';

function Home() {

    const countryList = {
        AED: "AE",
        AFN: "AF",
        XCD: "AG",
        ALL: "AL",
        AMD: "AM",
        ANG: "AN",
        AOA: "AO",
        AQD: "AQ",
        ARS: "AR",
        AUD: "AU",
        AZN: "AZ",
        BAM: "BA",
        BBD: "BB",
        BDT: "BD",
        XOF: "BE",
        BGN: "BG",
        BHD: "BH",
        BIF: "BI",
        BMD: "BM",
        BND: "BN",
        BOB: "BO",
        BRL: "BR",
        BSD: "BS",
        NOK: "BV",
        BWP: "BW",
        BYR: "BY",
        BZD: "BZ",
        CAD: "CA",
        CDF: "CD",
        XAF: "CF",
        CHF: "CH",
        CLP: "CL",
        CNY: "CN",
        COP: "CO",
        CRC: "CR",
        CUP: "CU",
        CVE: "CV",
        CYP: "CY",
        CZK: "CZ",
        DJF: "DJ",
        DKK: "DK",
        DOP: "DO",
        DZD: "DZ",
        ECS: "EC",
        EEK: "EE",
        EGP: "EG",
        ETB: "ET",
        EUR: "FR",
        FJD: "FJ",
        FKP: "FK",
        GBP: "GB",
        GEL: "GE",
        GGP: "GG",
        GHS: "GH",
        GIP: "GI",
        GMD: "GM",
        GNF: "GN",
        GTQ: "GT",
        GYD: "GY",
        HKD: "HK",
        HNL: "HN",
        HRK: "HR",
        HTG: "HT",
        HUF: "HU",
        IDR: "ID",
        ILS: "IL",
        INR: "IN",
        IQD: "IQ",
        IRR: "IR",
        ISK: "IS",
        JMD: "JM",
        JOD: "JO",
        JPY: "JP",
        KES: "KE",
        KGS: "KG",
        KHR: "KH",
        KMF: "KM",
        KPW: "KP",
        KRW: "KR",
        KWD: "KW",
        KYD: "KY",
        KZT: "KZ",
        LAK: "LA",
        LBP: "LB",
        LKR: "LK",
        LRD: "LR",
        LSL: "LS",
        LTL: "LT",
        LVL: "LV",
        LYD: "LY",
        MAD: "MA",
        MDL: "MD",
        MGA: "MG",
        MKD: "MK",
        MMK: "MM",
        MNT: "MN",
        MOP: "MO",
        MRO: "MR",
        MTL: "MT",
        MUR: "MU",
        MVR: "MV",
        MWK: "MW",
        MXN: "MX",
        MYR: "MY",
        MZN: "MZ",
        NAD: "NA",
        XPF: "NC",
        NGN: "NG",
        NIO: "NI",
        NPR: "NP",
        NZD: "NZ",
        OMR: "OM",
        PAB: "PA",
        PEN: "PE",
        PGK: "PG",
        PHP: "PH",
        PKR: "PK",
        PLN: "PL",
        PYG: "PY",
        QAR: "QA",
        RON: "RO",
        RSD: "RS",
        RUB: "RU",
        RWF: "RW",
        SAR: "SA",
        SBD: "SB",
        SCR: "SC",
        SDG: "SD",
        SEK: "SE",
        SGD: "SG",
        SKK: "SK",
        SLL: "SL",
        SOS: "SO",
        SRD: "SR",
        STD: "ST",
        SVC: "SV",
        SYP: "SY",
        SZL: "SZ",
        THB: "TH",
        TJS: "TJ",
        TMT: "TM",
        TND: "TN",
        TOP: "TO",
        TRY: "TR",
        TTD: "TT",
        TWD: "TW",
        TZS: "TZ",
        UAH: "UA",
        UGX: "UG",
        USD: "US",
        UYU: "UY",
        UZS: "UZ",
        VEF: "VE",
        VND: "VN",
        VUV: "VU",
        YER: "YE",
        ZAR: "ZA",
        ZMK: "ZM",
        ZWD: "ZW",
      };

    const [price,setPrice] = useState();
    const [amount,setAmount] = useState(1);
    const [fromcurrency,setfromcurrency]=useState("USD")
    const [tocurrency,settocurrency]=useState("INR")
    const [countries,setcountries] = useState({})
    const [symbol,setSymbol] = useState("");

    let getcountry=async()=>{
        let url="https://api.frankfurter.app/currencies"
        let response=await fetch(url)
        let data=await response.json()
        console.log(data)
        setcountries(data)
    }

    const handleInput = (e)=>{
        setAmount(e.target.value)
    }

    const handleApis = ()=>{
        const url = `https://v6.exchangerate-api.com/v6/7952fd9e1d05b1c21e113bcc/latest/${fromcurrency}`
        axios.get(url)
        .then((res)=>{
            let data = res.data;
            let val = (data.conversion_rates[tocurrency] * amount).toFixed(3)
            setPrice(val)
        })
        .catch((e)=>{
            console.log(e)
        })

        getSymbol()
    }

    const handleReverse = ()=>{
        let fromCurr = fromcurrency
        setfromcurrency(tocurrency);
        settocurrency(fromCurr);
    }

    const getSymbol = ()=>{
        let url = `https://restcountries.com/v3.1/alpha/${countryList[tocurrency]}`
        axios.get(url)
        .then((res)=>{
            let code = tocurrency
            let data = res.data[0].currencies[code].symbol;
            setSymbol(data);
        })
        .catch((e)=>{
            console.log(e);
        })
    }

    useEffect(()=>{
        getSymbol()
        getcountry()
        handleApis()
    },[])

    

  return (
    <div className='h-fit w-[90%] sm:w-[60%] md:w-1/2 lg:w-[40%] rounded-lg py-2 px-4 bg-white'>
      <p className='text-center text-2xl font-semibold italic mb-4'>Currency Convertor</p>
      <hr className='m-4'/>
      {price ? <><p className='text-center text-2xl font-semibold'>{symbol}&nbsp;{price}</p><p className='text-center mb-6'>Converted Currency&nbsp;{`(${tocurrency})`}</p></> : null}
      <input type="number" min={1} name='amount' id='inp-box' value={amount} onChange={handleInput} className='w-[70%] block mx-auto mb-10 rounded-md outline-none px-4 py-1 text-sm font-semibold bg-gray-200'/>
      <div className='w-[80%] mx-auto flex flex-col md:flex-row justify-between items-center mb-10'>
        <div className='h-[2rem] w-[60%] md:w-[40%] mb-3 md:mb-0 border-[1px] border-black flex flex-row justify-between items-center px-2 rounded-md'>
            <img src={`https://flagsapi.com/${countryList[fromcurrency]}/flat/64.png`} alt="" className='h-[85%] w-[20%] md:w-[25%] rounded-md' />
            <select name="fromCurr" id="from" className='h-full w-[60%] outline-none' value={fromcurrency} onChange={(e)=>{setfromcurrency(e.target.value)}}>
                {/* <option value="IND">IND</option> */}
                {
                    Object.entries(countries).map(([code,name])=>(
                        <option key={code}>
                            {code}
                        </option>
                    ))
                }
            </select>
        </div>
        <div className='h-[2rem] w-[10%] mb-3 md:mb-0  flex flex-row justify-center items-center'>
            <i className="hidden md:flex fa-solid fa-arrow-right-arrow-left cursor-pointer" onClick={handleReverse}></i>
            <i className="md:hidden fa-solid fa-arrows-up-down cursor-pointer" onClick={handleReverse}></i>
        </div>
        <div className='h-[2rem] w-[60%] md:w-[40%] border-[1px] border-black mb-3 md:mb-0 flex flex-row justify-between items-center px-2 rounded-md'>
            <img src={`https://flagsapi.com/${countryList[tocurrency]}/flat/64.png`} alt="" className='h-[85%] w-[20%] md:w-[25%] rounded-md'/>
            <select name="fromCurr" id="from" className='h-full w-[60%]  outline-none' value={tocurrency} onChange={(e)=>{settocurrency(e.target.value)}}>
                {/* <option value="IND">IND</option> */}
                {
                    Object.entries(countries).map(([code,name])=>(
                        <option key={code}>
                            {code}
                        </option>
                    ))
                }
            </select>
        </div>
      </div>
      <hr className='m-4'/>
      <button onClick={handleApis} className='h-8 w-4/5 sm:w-[40%] bg-blue-700 text-white font-semibold rounded-lg m-auto block mb-3 hover:bg-blue-800 transform hover:scale-105'>Convert Currency</button>
    </div>
  )
}

export default Home
