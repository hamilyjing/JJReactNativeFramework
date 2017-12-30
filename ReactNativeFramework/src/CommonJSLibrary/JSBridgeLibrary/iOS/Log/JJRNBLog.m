//
//  JJRNBLog.m
//  YiZhangTong_iOS_React
//
//  Created by jincieryi on 16/7/26.
//  Copyright © 2016年 pingan. All rights reserved.
//

#import "JJRNBLog.h"

@implementation JJRNBLog

RCT_EXPORT_MODULE(JJRNBLog)

RCT_EXPORT_METHOD(debug:(id)message)
{
#ifdef DEBUG
  NSLog(@"%@ line:%d", message, __LINE__);
#endif
}

@end
