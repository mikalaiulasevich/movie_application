import UIKit

class NoteEditView: UIView {

  private var textView: UITextView!
  private var blurImageView: UIImageView!
  
  private var saveButton: UIButton!
  private var closeButton: UIButton!

  @objc var text: String? {
    didSet {
      textView.text = text
    }
  }
  
  @objc var imageUrl: String? {
     didSet {
       if let imageUrl = imageUrl {
         setImageBackground(with: imageUrl)
       }
     }
   }

  @objc var onSave: RCTBubblingEventBlock?
  @objc var onClose: RCTBubblingEventBlock?
  
  @objc private func saveButtonTapped() {
    onSave?(["text": textView.text ?? ""])
  }
  
  @objc private func closeButtonTapped() {
    onClose?(nil)
  }

  override init(frame: CGRect) {
    super.init(frame: frame)

    setupView()
  }

  required init?(coder aDecoder: NSCoder) {
    super.init(coder: aDecoder)
    setupView()
  }

  private func setupView() {
    self.backgroundColor = .clear
    self.isUserInteractionEnabled = true

    textView = UITextView()
    textView.translatesAutoresizingMaskIntoConstraints = false
    textView.font = UIFont(name: "Urbanist", size: 16)
    textView.textColor = .white
    textView.backgroundColor = .clear
    textView.delegate = self
    textView.becomeFirstResponder()

    blurImageView = UIImageView()
    blurImageView.translatesAutoresizingMaskIntoConstraints = false
    
    closeButton = UIButton(type: .system)
    closeButton.translatesAutoresizingMaskIntoConstraints = false
    closeButton.setImage(UIImage(systemName: "chevron.left"), for: .normal)
    closeButton.tintColor = .white
    closeButton.addTarget(self, action: #selector(closeButtonTapped), for: .touchUpInside)
    
    saveButton = UIButton(type: .system)
    saveButton.translatesAutoresizingMaskIntoConstraints = false
    saveButton.setImage(UIImage(systemName: "display.and.arrow.down"), for: .normal)
    saveButton.tintColor = .white
    saveButton.addTarget(self, action: #selector(saveButtonTapped), for: .touchUpInside)

    addSubview(blurImageView)
    sendSubviewToBack(blurImageView)
    addSubview(textView)
    addSubview(closeButton)
    addSubview(saveButton)
    
    NSLayoutConstraint.activate([
            blurImageView.topAnchor.constraint(equalTo: topAnchor),
            blurImageView.leadingAnchor.constraint(equalTo: leadingAnchor),
            blurImageView.trailingAnchor.constraint(equalTo: trailingAnchor),
            blurImageView.bottomAnchor.constraint(equalTo: bottomAnchor),
            
            textView.topAnchor.constraint(equalTo: safeAreaLayoutGuide.topAnchor, constant: 64),
            textView.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 16),
            textView.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -16),
            textView.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -16),
            
            closeButton.topAnchor.constraint(equalTo: safeAreaLayoutGuide.topAnchor, constant: 16),
            closeButton.leadingAnchor.constraint(equalTo: leadingAnchor, constant: 16),
            closeButton.widthAnchor.constraint(equalToConstant: 24),
            closeButton.heightAnchor.constraint(equalToConstant: 24),
            
            saveButton.topAnchor.constraint(equalTo: safeAreaLayoutGuide.topAnchor, constant: 16),
            saveButton.trailingAnchor.constraint(equalTo: trailingAnchor, constant: -16),
            saveButton.widthAnchor.constraint(equalToConstant: 24),
            saveButton.heightAnchor.constraint(equalToConstant: 24),
        ])
        
        bringSubviewToFront(textView)
        bringSubviewToFront(saveButton)
        bringSubviewToFront(closeButton)
  }
  
  private func setImageBackground(with imageUrl: String) {
      guard let url = URL(string: imageUrl) else { return }
      
      URLSession.shared.dataTask(with: url) { [weak self] (data, response, error) in
        if let data = data, let image = UIImage(data: data) {
          DispatchQueue.main.asyncAfter(deadline: .now() + 0.1) {
                 let darkBlur = UIBlurEffect(style: .dark)
                 let blurView = UIVisualEffectView(effect: darkBlur)
                 blurView.frame = self?.bounds ?? .zero
                 self?.blurImageView.addSubview(blurView)
                 self?.blurImageView.image = image
                 self?.backgroundColor = .clear
               }
             }
      }.resume()
    }
}

extension NoteEditView: UITextViewDelegate {
  func textViewDidChange(_ textView: UITextView) {
    text = textView.text
  }
}
