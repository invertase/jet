#import "Jet.h"
#import <objc/runtime.h>
#import <React/RCTBridge.h>

static NSString *const kRCTDevSettingIsDebuggingRemotely = @"isDebuggingRemotely";
static NSString *const kRCTDevSettingsUserDefaultsKey = @"RCTDevMenu";
static NSString *const kRCTDevSettingHotLoadingEnabled = @"hotLoadingEnabled";


@implementation Jet

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE(Jet)

RCT_EXPORT_METHOD(reload) {
  [_bridge reload];
  return;
}

@end
