//
//  YZTRNBLogin.m
//  PANewToapAPP
//
//  Created by hamilyjing on 7/31/16.
//  Copyright © 2016 PingAn. All rights reserved.
//

#import "YZTRNBLogin.h"

#import "YZTLoginService.h"
#import "YZTServiceFactory.h"

extern NSString *YZTLoginServiceServerForceLogoutNotification;

@implementation YZTRNBLogin

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(serverForceLogout:(id)resultStatus)
{
    BOOL haveLogined = YZT_SERVICE(YZTLoginService).loginUserName.length > 0;
    if(!haveLogined)
    {
        return;
    }

    [[NSNotificationCenter defaultCenter] postNotificationName:YZTLoginServiceServerForceLogoutNotification object:resultStatus];
}

@end
