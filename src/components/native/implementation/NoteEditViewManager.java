package com.organictest.colocated;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.renderscript.RenderScript;
import android.renderscript.ScriptIntrinsicBlur;
import android.renderscript.Allocation;
import android.renderscript.Element;
import android.renderscript.Type;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;

public class NoteEditViewManager extends SimpleViewManager<FrameLayout> {
    private static final String REACT_CLASS = "NoteEditView";

    private ReactContext reactContext;

    public NoteEditViewManager(ReactContext context) {
        this.reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected FrameLayout createViewInstance(final ThemedReactContext reactContext) {
        FrameLayout view = new FrameLayout(reactContext);

        final TextView textView = new TextView(reactContext);
        final ImageView blurImageView = new ImageView(reactContext);
        final Button saveButton = new Button(reactContext);
        final Button closeButton = new Button(reactContext);

        view.addView(blurImageView);
        view.addView(textView);
        view.addView(saveButton);
        view.addView(closeButton);

        saveButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                WritableMap event = Arguments.createMap();
                event.putString("text", textView.getText().toString());

                reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                        view.getId(),
                        "onSave",
                        event
                );
            }
        });

        closeButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                        view.getId(),
                        "onClose",
                        null
                );
            }
        });

        return view;
    }

    @ReactProp(name = "text")
    public void setText(FrameLayout view, String text) {
        TextView textView = (TextView) view.getChildAt(1);
        textView.setText(text);
    }

    @ReactProp(name = "imageUrl")
    public void setImageUrl(FrameLayout view, String imageUrl) {
        ImageView blurImageView = (ImageView) view.getChildAt(0);
        setImageBackground(blurImageView, imageUrl);
    }

    private void setImageBackground(final ImageView blurImageView, final String imageUrl) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    Bitmap bitmap = BitmapFactory.decodeStream(new java.net.URL(imageUrl).openStream());

                    final Bitmap blurredBitmap = blurBitmap(bitmap);
                    blurImageView.post(new Runnable() {
                        @Override
                        public void run() {
                            blurImageView.setImageBitmap(blurredBitmap);
                        }
                    });
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }

    private Bitmap blurBitmap(Bitmap bitmap) {
        RenderScript renderScript = RenderScript.create(reactContext);
        final BitmapFactory.Options options = new BitmapFactory.Options();
        options.inSampleSize = 8; // Adjust this value to control the blur level
        Bitmap scaledBitmap = Bitmap.createScaledBitmap(bitmap, bitmap.getWidth() / 8, bitmap.getHeight() / 8, false);
        final Allocation input = Allocation.createFromBitmap(renderScript, scaledBitmap);
        final Type type = input.getType();
        final Allocation output = Allocation.createTyped(renderScript, type);
        final ScriptIntrinsicBlur script = ScriptIntrinsicBlur.create(renderScript, Element.U8_4(renderScript));
        script.setInput(input);
        script.setRadius(10f); // Adjust this value to control the blur radius
        script.forEach(output);
        output.copyTo(scaledBitmap);
        renderScript.destroy();
        return scaledBitmap;
    }
}
