//
//  RHViewController.m
//  NativeBridgeiOS
//
//  Created by Abraham Barrera on 6/13/12.
//  Copyright (c) 2012 __MyCompanyName__. All rights reserved.
//

#import "RHViewController.h"

@interface RHViewController ()

@end

@implementation RHViewController

@synthesize webview;

- (void)viewDidLoad
{
  [super viewDidLoad];
  [webview setDelegate:self];
    [webview loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:@"http://localhost:4567"]]];
    
  //[webview loadRequest:[NSURLRequest requestWithURL:[NSURL fileURLWithPath:[[NSBundle mainBundle] pathForResource:@"index" ofType:@"html"]isDirectory:NO]]];
}

- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType{
  NSURL *url = request.URL;
  if ([url.scheme isEqualToString:@"rhyboo"]) {
    [self performCommandURL:url]; 
    return NO;
  } 
  return YES;
}


- (void)performCommandURL:(NSURL*)url {
  NSString *command = url.host;    
  NSMutableDictionary *opts = [NSMutableDictionary dictionary];
  
  for (NSString *component in [url.query componentsSeparatedByString:@"&"]) {
    NSArray *key_value = [component componentsSeparatedByString:@"="];
    NSString *name = [(NSString *)[key_value objectAtIndex:0] 
                      stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    NSObject *value;
    if (key_value.count == 2) {
      value = [(NSString *)[key_value objectAtIndex:1] 
               stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    } else {
      value = [NSNull null];
    }
    [opts setObject:value forKey:name];
  }
  
  SEL webCommand = NSSelectorFromString(command);
  if (opts.count > 0)
    webCommand = NSSelectorFromString([NSString stringWithFormat:@"%@:", command]);
  
  if ([self respondsToSelector:webCommand]) {
    if (opts.count > 0) {
      [self performSelector:webCommand withObject:opts];      
    } else { 
      [self performSelector:webCommand];
    }
  } else {
    NSLog(@"Method not implemented: %@", command);
  }
  
}


#pragma mark - Cache 
- (void)sayHello:(NSMutableDictionary*)opts {
  NSString *message =[NSString stringWithFormat:@"Hello %@", 
                      [opts valueForKey:@"name"]]; 
  
  UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Rhyboo"
                                                  message:message
                                                 delegate:self
                                        cancelButtonTitle:@"OK"
                                        otherButtonTitles:nil];
  [alert autorelease];
  [alert show];
} 

- (void)alertView:(UIAlertView *)alertView willDismissWithButtonIndex:(NSInteger)buttonIndex {
    [webview stringByEvaluatingJavaScriptFromString: 
     [NSString stringWithFormat:@"iOSBrdige.callback({message: 'select button %d'})", buttonIndex]];
}

- (void)viewDidUnload
{
    [super viewDidUnload];
    // Release any retained subviews of the main view.
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
  if ([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPhone) {
      return (interfaceOrientation != UIInterfaceOrientationPortraitUpsideDown);
  } else {
      return YES;
  }
}

@end
