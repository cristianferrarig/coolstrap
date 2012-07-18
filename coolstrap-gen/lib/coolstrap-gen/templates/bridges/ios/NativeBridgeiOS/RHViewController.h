//
//  RHViewController.h
//  NativeBridgeiOS
//
//  Created by Abraham Barrera on 6/13/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface RHViewController : UIViewController  <UIAlertViewDelegate, UIWebViewDelegate>{
  UIWebView  *webview;
}
@property (nonatomic, retain) IBOutlet UIWebView *webview;  

- (void)performCommandURL:(NSURL*)url;

@end
