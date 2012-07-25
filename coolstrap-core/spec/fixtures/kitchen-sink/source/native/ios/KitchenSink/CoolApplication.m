//
//  CoolApplication.m
//  KitchenSink
//
//  Created by Abraham Barrera on 7/18/12.
//  Copyright (c) 2012  Need More Caffeine. All rights reserved.
//

#import "CoolApplication.h"

@implementation CoolApplication

- (void)appStartedWithSession:(NSString*)sessionId {
  
  CsSingleWebViewController *root = [[CsSingleWebViewController alloc] 
                                     initWithURL:@"http://localhost:4567"];
  
  [self.window setRootViewController:root];
  
}

@end
