package com.example.sravs.androidwearapplication;


import android.app.Activity;
import android.os.Bundle;
import android.os.StrictMode;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Properties;

public class MainActivity extends Activity {

    private TextView a;
    private EditText b;
    public static Properties properties = new Properties();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.round_activity_main);
        a = (TextView) findViewById(R.id.locationView);
        Button button = (Button) findViewById(R.id.searchButton);
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);
    }

    public void search(View v) {
        b = (EditText) findViewById(R.id.editext_enterWord);
        String search = b.getText().toString();

        String geturl = "https://api.foursquare.com/v2/venues/search?client_id=3PPNMTIKJJNDVYPFOBGSHHV2PR5A2P05PYHXDN2MKSKTTBSX&client_secret=0QPHT0F5RS043F4TB4KKPQSHKSAXKE5ZNOYGB5KL2MBDYAG4&v=20160215&limit=5&near="+b+"&query=shopping" ;
        //Toast.makeText(this, "get url="+getURL, Toast.LENGTH_SHORT).show();

        String response = null;
        BufferedReader q = null;
        try {
            URL url = new URL(geturl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.connect();

            q = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            StringBuilder sb = new StringBuilder();
            String line = null;

            // Read Server Response
            while ((line = q.readLine()) != null) {
                // Append server response in string
                sb.append(line + " ");
            }
            response = sb.toString();



        JSONObject result;
        try {
            result = new JSONObject(response);
            JSONObject a = result.getJSONObject("response");
            JSONArray array = a.optJSONArray("venues");
           this.a.setText("Name:"+ array.getJSONObject(0).getString("name"));
           // Toast.makeText(this, "i="+i, Toast.LENGTH_SHORT).show();
        } catch (JSONException e) {
            e.printStackTrace();
        }

    } catch (Exception ex) {
    } finally {
        try {
            q.close();
        } catch (Exception ex) {

        }
    }

    }
}