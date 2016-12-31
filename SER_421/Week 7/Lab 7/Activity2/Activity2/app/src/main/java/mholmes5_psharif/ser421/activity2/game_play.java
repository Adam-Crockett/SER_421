package mholmes5_psharif.ser421.activity2;

import android.content.Context;
import android.content.Intent;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

public class game_play extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_game_play);

        Bundle bundle = getIntent().getExtras();
        String name = bundle.getString("name");


        WebView browser = (WebView)findViewById(R.id.webView);

        browser.setWebViewClient(new WebViewClient());
        browser.getSettings().setJavaScriptEnabled(true);
        browser.loadUrl("file:///android_asset/www/clue.html");
        browser.addJavascriptInterface(new WebAppInterface(this,name), "Android");

    }

    public class WebAppInterface {
        Context mContext;
        String name;

        /** Instantiate the interface and set the context */
        WebAppInterface(Context c,String name) {
            mContext = c;
            this.name = name;
        }

        @JavascriptInterface
        public String getName(){
            return this.name;
        }

        @JavascriptInterface
        public void restart(){
            Intent playClue = new Intent(game_play.this, MainActivity.class);
            startActivity(playClue);
            finish();
        }

    }
}
