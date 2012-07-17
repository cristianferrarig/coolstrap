//
//  RHAppDelegate.h
//  NativeBridgeiOS
//
//  Created by Abraham Barrera on 6/13/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>

@class RHViewController;

@interface RHAppDelegate : UIResponder <UIApplicationDelegate>

@property (strong, nonatomic) UIWindow *window;

@property (strong, nonatomic) RHViewController *viewController;

@end
