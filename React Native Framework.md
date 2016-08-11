# React Native Framework

本文主要介绍一种APP端的React Native开发框架，帮助你快速接入React Native功能。

代码地址：
[框架代码](https://github.com/hamilyjing/JJReactNativeFramework)

## 框架简介

![image](https://mmbiz.qlogo.cn/mmbiz/YTAjOycganPHiamCrmnWPKrOKOtudk0YUdvxGFgMno68Gic4GWe2L8icfnPiaOWKW9R3YdUr1sqicBkEWRdobTjCyZQ/0?wx_fmt=jpeg)

框架由上至下：视图层，服务层，JS通用库，JS项目库，运行时。

1. 视图层

	当页面间存在较多数据传递，可以采用Redux框架来开发UI。Redux框架有以下几点好处：
	
	（1）模型、业务逻辑和UI分离，类似MVP中Presenter作用。
	
	（2）数据共享。
	
	（3）可以直接改变state树上的任何数据，达到类似于通知作用。
	
	也有如下缺点：
	
	（1）action type需要唯一，由于action中多数处理网络请求，一种解决方案是增加每种网络请求类型字段，当网络回来后，对应的action type由模块名+网络请求类型组成，实现action type唯一。
	
	（2）reducer里常见if和switch语句，解决方案可以在action中做业务逻辑处理，将处理后的数据和type传递给reducer，reducer先判断type前缀是否是自己模块名，不是直接返回state，是的话，拷贝一份state，然后将接收到的对象加入到新的state中，并返回，这样reducer功能单一，只负责传递数据，看不到多余的if和switch语句。
	
	当然Redux框架写起来有一定复杂度，对于一些简单页面，可以直接调用setState方法即可。
	
2. 服务层
	
	服务组件提供业务功能API，同时提供获取、删除缓存等功能，业务逻辑处理、网络请求封装在服务组件里，服务组件的实现，不依赖UI层使用哪种开发框架实现。服务组件之间无任何关联，完全解耦。
	
	视图层可以任意调用1个或N个服务组件来实现自己的需求。
	
3. JS通用库

	JS通用库使用的iOS或Android的桥只能用系统库实现，所有可以将整个JS通用库层拿出来给任意工程来使用。
	
4. JS项目库

	JS项目库使用的iOS或Android的桥由项目业务相关代码实现，其中Common JS API需要iOS和Android都需要在Native端实现对应的桥，只iOS或Android的JS API放在自己平台目录下。

5. 运行时

	这一层是说JS API如何在运行时找到当前平台的代码。有两种方式：
	
	（1）文件名扩展，React Native会检测某个文件是否具有.ios.或是.android.的扩展名，然后根据当前运行的平台加载正确对应的文件。
	
	（2）平台检测，代码中通Platform.OS返回的值来调用不同平台的桥。
	

## 其他

1. 数据回调方式

	服务组件通过回调模式返回数据给使用者。

2. 网路

	框架实现了HTTP请求，使用者只需要继承JJHTTPRequest，传入请求地址、请求方式等等，调用start就可以完成一次数据请求，框架提供stop接口，可以停止本次请求。
	
	JJHTTPRequest实现了数据的存储、获取和删除，子类可以实现operate函数，实现本次请求和缓存数据的合并。

3. 代码规范

	可以使用eslint指定代码规范，自动检查代码规范。

4. 开发工具

	WebStorm或者Atom。
