//
//  CSUtils.h
//  Coolstrap
//
//  Created by Abraham Barrera on 4/23/12.
//  Copyright (c) 2012 Rhyboo. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>

#define RELEASE_TO_NIL(x) { if (x!=nil) { [x release]; x = nil; } }
#define RELEASE_TO_NIL_AUTORELEASE(x) { if (x!=nil) { [x autorelease]; x = nil; } }
#define RELEASE_AND_REPLACE(x,y) { [x release]; x = [y retain]; }

#define NUMBOOL(x) \
[NSNumber numberWithBool:x]\

#define NUMINT(x) \
[NSNumber numberWithInt:x]\

#define MAKE_SYSTEM_PROP(name,map) \
-(NSNumber*)name \
{\
return [NSNumber numberWithInt:map];\
}\

#define VAL_OR_NSNULL(foo)	(((foo) != nil)?((id)foo):[NSNull null])

#define CODELOCATION	[NSString stringWithFormat:@" in %s (%@:%d)",__FUNCTION__,[[NSString stringWithFormat:@"%s",__FILE__] lastPathComponent],__LINE__]

#define ENSURE_CLASS(x,t) \
if (![x isKindOfClass:t]) \
{ \
[self throwException:TiExceptionInvalidType subreason:[NSString stringWithFormat:@"expected: %@, was: %@",t,[x class]] location:CODELOCATION]; \
}\

#define ENSURE_TYPE(x,t) ENSURE_CLASS(x,[t class])

#define ENSURE_METHOD(x,t) \
if (![x respondsToSelector:@selector(t)]) \
{ \
[self throwException:TiExceptionInvalidType subreason:[NSString stringWithFormat:@"%@ doesn't respond to method: %@",[x class],@#t] location:CODELOCATION]; \
}\

#define IS_NULL_OR_NIL(x)	((x==nil) || ((id)x==[NSNull null]))


@interface CSUtils : NSObject

+(NSString*)createUUID;
+(NSString*)appIdentifier;

+(BOOL)isIPad;
+(BOOL)isRetinaDisplay;

+(NSString*)stringValue:(id)value;
+(BOOL)boolValue:(id)value;
+(NSString *)UTCDate;
+(NSString *)stringifyJSON:(id)inputObject;
@end
