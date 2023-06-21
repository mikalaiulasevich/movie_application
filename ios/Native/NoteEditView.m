#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(NoteEditViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(text, NSString)
RCT_EXPORT_VIEW_PROPERTY(imageUrl, NSString)
RCT_EXPORT_VIEW_PROPERTY(onSave, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onClose, RCTBubblingEventBlock)

@end
