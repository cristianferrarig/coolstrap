//
//  CSJSEngine.h
//  Coolstrap
//
//  Created by Johannes Fahrenkrug on 27.02.12.
//  Copyright (c) 2012 Springenwerk. All rights reserved.
//
//  Modified by Abraham Barrera C. on 29.05.2012
//  Rhyboo

#import <Foundation/Foundation.h>
#import "JavaScriptCore.h"

@interface CSJSEngine : NSObject {
    JSGlobalContextRef _JSContext;
    JSClassRef  _COOL;
    JSClassRef  _COOL_Console;
}


static JSValueRef __COOLGetProperty(JSContextRef ctx, JSObjectRef object, JSStringRef propertyNameJS, JSValueRef* exception);


- (JSGlobalContextRef) JSContext;
- (NSString *)runJS:(NSString *)aJSString;
- (void)loadJSLibrary:(NSString*)libraryName;

@end
