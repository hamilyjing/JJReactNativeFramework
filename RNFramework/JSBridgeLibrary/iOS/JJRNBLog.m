//
//  JJRNBLog.m
//  YiZhangTong_iOS_React
//
//  Created by jincieryi on 16/7/26.
//  Copyright © 2016年 pingan. All rights reserved.
//

#import "JJRNBLog.h"

#ifdef DEBUG
#define JJLog(fmt, ...) NSLog(fmt @" %s line:%d", ##__VA_ARGS__, __PRETTY_FUNCTION__, __LINE__)
#else
#define JJLog(fmt, ...)
#endif

@implementation JJRNBLog

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE(JJRNBLog)

RCT_EXPORT_METHOD(jjLog:(id)options)
{
    JJLog(@"jj_log:%@",options);
}

@end
