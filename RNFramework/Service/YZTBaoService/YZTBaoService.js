/**
 * Created by JJ on 16/7/20.
 */

import YZTBaoRequest from './Network/YZTBaoRequest';

const YZTBaoServiceRequestTypeToaPayQueryShareList = 'toaPayQueryShareList';
const YZTBaoServiceRequestTypeToaPaySmsExchangeCard = 'toaPaySmsExchangeCard';
const YZTBaoServiceRequestTypeToaPaySMSAuthSign = 'toaPaySMSAuthSign';
const YZTBaoServiceRequestTypeToaPayGenerateOTP = 'toaPayGenerateOTP';
const YZTBaoServiceRequestTypeToaPayUpgradeBankCard = 'toaPayUpgradeBankCard';
const YZTBaoServiceRequestTypeToaPayVerifySMSAuthSign = 'toaPayVerifySMSAuthSign';
const YZTBaoServiceRequestTypeVerifyCardNoIsDuplication = 'verifyCardNoIsDuplication';
const YZTBaoServiceRequestTypeVerifyCardIsSupport = 'verifyCardIsSupport';
const YZTBaoServiceRequestTypeToaPayBindCard = 'toaPayBindCard';
const YZTBaoServiceRequestTypeToaPayCheckLastOTP = 'toaPayCheckLastOTP';
const YZTBaoServiceRequestTypeGetBankCardSignedInfo = 'getBankCardSignedInfo';

class YZTBaoService
{
    static obtainToaPayQueryShareList(recordNo)
    {
        let parameter = {recordNo: recordNo};

        let baoRequest = new YZTBaoRequest(YZTBaoServiceRequestTypeToaPayQueryShareList, parameter, true);
        return baoRequest.obtainCache()
    }

    static requestToaPayQueryShareList(recordNo, networkSuccessCallBack, networkFailCallBack)
    {
        let parameter = {recordNo: recordNo};

        let baoRequest = new YZTBaoRequest(YZTBaoServiceRequestTypeToaPayQueryShareList, parameter, true);
        baoRequest.start(networkSuccessCallBack, networkFailCallBack);
    }

    static requestToaPaySmsExchangeCard(capitalmode,cardNo,openCardMobile,networkSuccessCallBack,networkFailCallBack)
    {
        let parameter = {capitalmode:capitalmode,cardNo:cardNo,openCardMobile:openCardMobile};

        let baoRequest = new YZTBaoRequest(YZTBaoServiceRequestTypeToaPaySmsExchangeCard, parameter, false);
        baoRequest.start(networkSuccessCallBack, networkFailCallBack);
    }

    static requestToaPayGenerateOTP(templeteId,mobile,networkSuccessCallBack,networkFailCallBack)
    {
        let parameter = {templeteId:templeteId,mobile:mobile};

        let baoRequest = new YZTBaoRequest(YZTBaoServiceRequestTypeToaPayGenerateOTP, parameter, false);
        baoRequest.start(networkSuccessCallBack, networkFailCallBack);
    }

    static requestToaPayUpgradeBankCard(fundseqid,cardNo,verifycode,networkSuccessCallBack,networkFailCallBack)
    {
        let parameter = {fundseqid:fundseqid,cardNo:cardNo,verifycode:verifycode};

        let baoRequest = new YZTBaoRequest(YZTBaoServiceRequestTypeToaPayUpgradeBankCard, parameter, false);
        baoRequest.start(networkSuccessCallBack, networkFailCallBack);
    }

    static requestToaPayVerifySMSAuthSign(authOrderNo,validCode,networkSuccessCallBack,networkFailCallBack)
    {
        let parameter = {authOrderNo:authOrderNo,validCode:validCode};

        let baoRequest = new YZTBaoRequest(YZTBaoServiceRequestTypeToaPayVerifySMSAuthSign, parameter, false);
        baoRequest.start(networkSuccessCallBack, networkFailCallBack);
    }

    static requestVerifyCardNoIsDuplication(cardNo,networkSuccessCallBack,networkFailCallBack)
    {
        let parameter = {cardNo:cardNo,cardClassify:'00', cardType:'1', currency:'CNY'};

        let baoRequest = new YZTBaoRequest(YZTBaoServiceRequestTypeVerifyCardNoIsDuplication, parameter, false);
        baoRequest.start(networkSuccessCallBack, networkFailCallBack);
    }

    static requestVerifyCardIsSupport(bankCode,networkSuccessCallBack,networkFailCallBack)
    {
        let parameter = {bankCode:bankCode};

        let baoRequest = new YZTBaoRequest(YZTBaoServiceRequestTypeVerifyCardIsSupport, parameter, false);
        baoRequest.start(networkSuccessCallBack, networkFailCallBack);
    }

    static requestToaPayBindCard(cardType,authOrderNo,cardNo,custName,networkSuccessCallBack,networkFailCallBack)
    {
        let parameter = {cardType:cardType,authOrderNo:authOrderNo,cardNo:cardNo,custName:custName,cardClassify:'00',
            currency:'CNY'};

        let baoRequest = new YZTBaoRequest(YZTBaoServiceRequestTypeToaPayBindCard, parameter, false);
        baoRequest.start(networkSuccessCallBack, networkFailCallBack);
    }

    static requestToaPayCheckLastOTP(mobile,templetId,phonecode,networkSuccessCallBack,networkFailCallBack)
    {
        let parameter = {mobile:mobile,templetId:templetId,phonecode:phonecode};

        let baoRequest = new YZTBaoRequest(YZTBaoServiceRequestTypeToaPayCheckLastOTP, parameter, false);
        baoRequest.start(networkSuccessCallBack, networkFailCallBack);
    }

    static requestGetBankCardSignedInfo(phone,cardNo,bankNo,networkSuccessCallBack,networkFailCallBack)
    {
        let parameter = {phone:phone,cardNo:cardNo,bankNo:bankNo};

        let baoRequest = new YZTBaoRequest(YZTBaoServiceRequestTypeGetBankCardSignedInfo, parameter, false);
        baoRequest.start(networkSuccessCallBack, networkFailCallBack);
    }
}

export default YZTBaoService;
