//
//  CsSingleWebViewController.h
//  Coolstrap
//
//  Created by Abraham Barrera on 7/18/12.
//  Copyright (c) 2012 Rhyboo. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "CsCoolWebView.h"

@interface CsSingleWebViewController : UIViewController {
  CsCoolWebView *webContainer; 
  NSString *indexURL;
  
}
@property (nonatomic, retain) NSString *indexURL;
@property (nonatomic, retain) CsCoolWebView *webContainer; 

- (id)initWithURL:(NSString *)url;

@end

