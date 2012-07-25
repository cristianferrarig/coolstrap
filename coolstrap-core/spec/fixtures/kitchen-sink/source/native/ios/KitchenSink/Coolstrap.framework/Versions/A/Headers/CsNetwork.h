//
//  CSNetwork.h
//  Coolstrap
//
//  Created by Abraham Barrera on 4/23/12.
//  Copyright (c) 2012 Rhyboo. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Reachability.h"

typedef enum {
	CSNetworkConnectionStateNone = 0,
	CSNetworkConnectionStateWifi = 1,
	CSNetworkConnectionStateMobile = 2,
	CSNetworkConnectionStateLan = 3,
	CSNetworkConnectionStateUnknown = 4,	
} CSNetworkConnectionState;

  
@interface CSNetwork : NSObject {
@private
  CSNetworkConnectionState state;
  Reachability *reachability;
}

@property(nonatomic,readonly) NSNumber* online;
@property(nonatomic,readonly) NSString* networkTypeName;
@property(nonatomic,readonly) NSNumber* networkType;
@property(nonatomic,readonly) NSString* remoteDeviceUUID;

@property(nonatomic,readonly) NSNumber* NETWORK_NONE;
@property(nonatomic,readonly) NSNumber* NETWORK_WIFI;
@property(nonatomic,readonly) NSNumber* NETWORK_MOBILE;
@property(nonatomic,readonly) NSNumber* NETWORK_LAN;
@property(nonatomic,readonly) NSNumber* NETWORK_UNKNOWN;

-(id)encodeURIComponent:(id)args;
-(id)decodeURIComponent:(id)args;

#pragma mark Private
-(void)updateReachabilityStatus;

@end
