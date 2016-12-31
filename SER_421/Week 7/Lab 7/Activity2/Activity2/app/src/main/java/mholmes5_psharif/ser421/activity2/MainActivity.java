package mholmes5_psharif.ser421.activity2;

import android.content.Intent;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    protected void playGame(View button){
        EditText nameField = (EditText) findViewById(R.id.Edit_Name);
        String name = nameField.getText().toString();

        Intent playClue = new Intent(MainActivity.this, game_play.class);
        playClue.putExtra("name",name);
        startActivity(playClue);

        /*
        AlertDialog alertDialog = new AlertDialog.Builder(this).create();
        alertDialog.setTitle("Lets play Clue");
        alertDialog.setMessage(name);
        alertDialog.show();
        */
    }
}
