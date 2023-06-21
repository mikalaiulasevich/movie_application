@objc(NoteEditViewManager)
class NoteEditViewManager: RCTViewManager {

  override static func requiresMainQueueSetup() -> Bool {
      return true
  }

  override func view() -> UIView! {
      return NoteEditView()
  }

}
