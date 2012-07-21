//
//  CSPlatform.h
//  Coolstrap
//
//  Created by Abraham Barrera on 4/23/12.
//  Copyright (c) 2012 Rhyboo. All rights reserved.
//
//  Based on implementation of Appcelerator Titanium 
//  PlatformModule 


#import <Foundation/Foundation.h>
#import "CSUtils.h"

@interface CSPlatform : NSObject {
  NSString *name;
	NSString *model;
	NSString *version;
	NSString *architecture;
	NSNumber *processorCount;
	NSString *username;
	NSString *address;
	NSString *ostype;
  NSString *osname;
	NSNumber *availableMemory;
  NSString *userAgent;
}

@property(readonly,nonatomic) NSString *id;
@property(readonly,nonatomic) NSString *name;
@property(readonly,nonatomic) NSString *model;
@property(readonly,nonatomic) NSString *version;
@property(readonly,nonatomic) NSString *architecture;
@property(readonly,nonatomic) NSString *macaddress;
@property(readonly,nonatomic) NSNumber *processorCount;
@property(readonly,nonatomic) NSString *username;
@property(readonly,nonatomic) NSString *address;
@property(readonly,nonatomic) NSString *ostype;
@property(readonly,nonatomic) NSString *osname;
@property(readonly,nonatomic) NSNumber *availableMemory;
@property(readonly,nonatomic) NSString *locale;

-(NSString*)userAgent;

@end
