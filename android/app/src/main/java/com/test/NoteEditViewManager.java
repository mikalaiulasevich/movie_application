package com.test;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.os.Handler;
import android.renderscript.RenderScript;
import android.renderscript.ScriptIntrinsicBlur;
import android.renderscript.Allocation;
import android.renderscript.Element;
import android.renderscript.Type;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewTreeObserver;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.FrameLayout;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.util.Map;

public class NoteEditViewManager extends SimpleViewManager<FrameLayout> {
    private static final String REACT_CLASS = "NoteEditView";

    private final ReactContext reactContext;

    private FrameLayout view;
    private FrameLayout buttons;

    private TextView editText;
    private ImageView blurImageView;
    private ImageButton saveButton;
    private ImageButton closeButton;

    public NoteEditViewManager(ReactContext context) {
        this.reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @NonNull
    @Override
    protected FrameLayout createViewInstance(@NonNull final ThemedReactContext reactContext) {

        view = new FrameLayout(reactContext);

        editText = new EditText(reactContext);
        blurImageView = new ImageView(reactContext);

        buttons = new FrameLayout(reactContext);

        FrameLayout.LayoutParams buttonsLayout = new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT
        );

        buttonsLayout.gravity = Gravity.TOP;

        buttons.setLayoutParams(buttonsLayout);

        saveButton = new ImageButton(reactContext);
        closeButton = new ImageButton(reactContext);

        saveButton.setImageResource(android.R.drawable.ic_menu_save);
        closeButton.setImageResource(android.R.drawable.ic_menu_close_clear_cancel);

        saveButton.setId(View.generateViewId());
        closeButton.setId(View.generateViewId());

        saveButton.setBackgroundColor(Color.TRANSPARENT);
        closeButton.setBackgroundColor(Color.TRANSPARENT);

        FrameLayout.LayoutParams saveButtonLayout = new FrameLayout.LayoutParams(FrameLayout.LayoutParams.WRAP_CONTENT, FrameLayout.LayoutParams.WRAP_CONTENT);
        saveButtonLayout.gravity = Gravity.END;
        saveButton.setLayoutParams(saveButtonLayout);

        FrameLayout.LayoutParams closeButtonLayout = new FrameLayout.LayoutParams(FrameLayout.LayoutParams.WRAP_CONTENT, FrameLayout.LayoutParams.WRAP_CONTENT);
        closeButtonLayout.gravity = Gravity.START;
        closeButton.setLayoutParams(closeButtonLayout);

        closeButton.setOnClickListener(v -> {
            WritableMap event = Arguments.createMap();

            ((ReactContext) view.getContext()).getJSModule(RCTEventEmitter.class).receiveEvent(
                    view.getId(),
                    "ON_CLOSE",
                    event);
        });

        saveButton.setOnClickListener(v -> {
            WritableMap event = Arguments.createMap();

            event.putString("text", editText.getText().toString());

            ((ReactContext) view.getContext()).getJSModule(RCTEventEmitter.class).receiveEvent(
                    view.getId(),
                    "ON_SAVE",
                    event);
        });

        buttons.addView(closeButton);
        buttons.addView(saveButton);

        blurImageView.setScaleType(ImageView.ScaleType.CENTER_CROP);

        view.addView(blurImageView, new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT
        ));

        int padding = 32;

        editText.setPadding(padding, 120, padding, padding);
        editText.setVerticalScrollBarEnabled(false);
        editText.setFocusableInTouchMode(true);
        editText.setBackground(null);

        editText.setGravity(Gravity.TOP);

        FrameLayout.LayoutParams editTextLayout = new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                FrameLayout.LayoutParams.MATCH_PARENT
        );

        view.addView(editText, editTextLayout);
        view.addView(buttons);

        view.getViewTreeObserver().addOnGlobalLayoutListener(new ViewTreeObserver.OnGlobalLayoutListener() {
            @Override
            public void onGlobalLayout() {

                view.getViewTreeObserver().removeOnGlobalLayoutListener(this);

                new Handler().postDelayed(() -> {

                    editText.requestFocus();

                    InputMethodManager imm = (InputMethodManager) reactContext.getSystemService(Context.INPUT_METHOD_SERVICE);

                    imm.showSoftInput(editText, InputMethodManager.SHOW_IMPLICIT);

                }, 500);
            }
        });

        return view;
    }

    @Override
    @Nullable
    public Map getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.of(
                "ON_SAVE",
                MapBuilder.of("phasedRegistrationNames", MapBuilder.of("bubbled", "onSave")),
                "ON_CLOSE",
                MapBuilder.of("phasedRegistrationNames", MapBuilder.of("bubbled", "onClose"))
        );
    }

    @ReactProp(name = "text")
    public void setText(FrameLayout view, String text) {
        editText.setText(text);
    }

    @ReactProp(name = "imageUrl")
    public void setImageUrl(FrameLayout view, String imageUrl) {
        setImageBackground(blurImageView, imageUrl);
    }

    private void setImageBackground(final ImageView blurImageView, final String imageUrl) {
        new Thread(() -> {
            try {
                Bitmap bitmap = BitmapFactory.decodeStream(new java.net.URL(imageUrl).openStream());

                final Bitmap blurredBitmap = blurBitmap(bitmap);

                blurImageView.post(() -> blurImageView.setImageBitmap(blurredBitmap));

            } catch (Exception e) {
                e.printStackTrace();
            }
        }).start();
    }

    private Bitmap blurBitmap(Bitmap bitmap) {
        RenderScript renderScript = RenderScript.create(reactContext);

        final BitmapFactory.Options options = new BitmapFactory.Options();

        options.inSampleSize = 8;

        Bitmap scaledBitmap = Bitmap.createScaledBitmap(bitmap, bitmap.getWidth() / 8, bitmap.getHeight() / 8, false);

        final Allocation input = Allocation.createFromBitmap(renderScript, scaledBitmap);
        final Type type = input.getType();
        final Allocation output = Allocation.createTyped(renderScript, type);
        final ScriptIntrinsicBlur script = ScriptIntrinsicBlur.create(renderScript, Element.U8_4(renderScript));

        script.setInput(input);
        script.setRadius(10f);
        script.forEach(output);
        output.copyTo(scaledBitmap);

        Canvas canvas = new Canvas(scaledBitmap);
        Paint darkPaint = new Paint();

        darkPaint.setColor(Color.parseColor("#80000000"));

        canvas.drawRect(0, 0, scaledBitmap.getWidth(), scaledBitmap.getHeight(), darkPaint);

        renderScript.destroy();

        return scaledBitmap;
    }
}