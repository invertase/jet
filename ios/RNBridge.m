#import "RNBridge.h"
#import <React/RCTBridge.h>

static NSString *const kRCTDevSettingIsDebuggingRemotely = @"isDebuggingRemotely";

@implementation RNBridge

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE(RNBridge)

RCT_EXPORT_METHOD(reload) {
  [_bridge reload];
  return;
}

RCT_EXPORT_METHOD(debug:(BOOL)value) {
  [[NSUserDefaults standardUserDefaults] setObject:value forKey:kRCTDevSettingIsDebuggingRemotely];
  _bridge.executorClass = value ? objc_getClass("RCTWebSocketExecutor") : nil;
  [_bridge reload];
  return;
}

@end
