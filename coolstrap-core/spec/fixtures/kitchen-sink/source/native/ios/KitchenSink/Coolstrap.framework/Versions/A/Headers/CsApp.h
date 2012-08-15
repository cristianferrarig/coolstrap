//
//  CSApp.h
//  Coolstrap
//
//  Created by Abraham Barrera on 5/29/12.
//  Copyright (c) 2012 Rhyboo. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

@interface CsApp : UIResponder <UIApplicationDelegate> {

}

@property (strong, nonatomic) UIWindow *window;

- (void)appStartedWithSession:(NSString*)sessionId;

+ (BOOL)boot:(UIWindow*)window;
+ (NSString*)stringForKey:(NSString*)key;
+ (NSString*)currentVersion;
+ (NSString*)sessionId;
+ (NSString*)remoteDeviceUUID;
+ (BOOL)addDependence:(NSString*)name ofType:(NSString*)type;


@end
