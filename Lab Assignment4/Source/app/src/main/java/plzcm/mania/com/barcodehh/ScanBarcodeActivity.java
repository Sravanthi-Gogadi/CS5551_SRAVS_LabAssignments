package plzcm.mania.com.barcodehh;

import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v4.app.ActivityCompat;
import android.util.SparseArray;
import android.view.SurfaceHolder;
import android.view.SurfaceView;

import com.google.android.gms.common.api.CommonStatusCodes;
import com.google.android.gms.vision.CameraSource;
import com.google.android.gms.vision.Detector;
import com.google.android.gms.vision.barcode.Barcode;
import com.google.android.gms.vision.barcode.BarcodeDetector;

import java.io.IOException;
import java.util.jar.Manifest;

/**
 * Created by gogadi on 9/20/2017.
 */

public class ScanBarcodeActivity extends Activity {
    SurfaceView cameraPreview;
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_scan_barcode);
        cameraPreview=(SurfaceView)findViewById(R.id.camera_preview);
    }
    private void createCameraSource(){
        BarcodeDetector barcodeDetector = new BarcodeDetector.Builder(this) .build();
        final CameraSource cameraSource= new CameraSource.Builder(this,barcodeDetector)
                .setAutoFocusEnabled(true)
                .setRequestedPreviewSize(1600,1024)
                .build();
        cameraPreview.getHolder().addCallback(new SurfaceHolder.Callback() {
            @Override
            public void surfaceCreated(SurfaceHolder holder) {
                if (ActivityCompat.checkSelfPermission(ScanBarcodeActivity.this, android.Manifest.permission.CAMERA)
                        != PackageManager.PERMISSION_GRANTED) {
                    return;
                }
                try{
                    cameraSource.start(cameraPreview.getHolder());
                }catch (IOException e){
                    e.printStackTrace();
                }
            }

            @Override
            public void surfaceChanged(SurfaceHolder holder, int format, int width, int height) {

            }

            @Override
            public void surfaceDestroyed(SurfaceHolder holder) {
              cameraSource.stop();
            }
        });
        barcodeDetector.setProcessor(new Detector.Processor<Barcode>() {
            @Override
            public void release() {

            }

            @Override
            public void receiveDetections(Detector.Detections<Barcode> detections) {
            final SparseArray<Barcode> barcodes = detections.getDetectedItems();
                if(barcodes.size()>0){
                    Intent intent=new Intent();
                    intent.putExtra("barcode",barcodes.valueAt(0));
                    setResult(CommonStatusCodes.SUCCESS,intent);
                    finish();
            }
            }
        });
    }
}


