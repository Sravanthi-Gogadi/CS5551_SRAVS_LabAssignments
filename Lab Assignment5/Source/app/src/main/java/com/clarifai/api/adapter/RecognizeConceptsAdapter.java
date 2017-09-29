package com.clarifai.android.api;

import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import butterknife.BindView;
import butterknife.ButterKnife;
import clarifai2.dto.prediction.Concept;
import com.clarifai.android.starter.api.v2.R;

import java.util.ArrayList;
import java.util.List;

public class RecognizeConceptsAdapter extends RecyclerView.Adapter<RecognizeConceptsAdapter.Holder> {

  @NonNull private List<Concept> concepts = new ArrayList<>();

  public RecognizeConceptsAdapter setData(@NonNull List<Concept> concepts) {
    this.concepts = concepts;
    notifyDataSetChanged();
    return this;
  }

  @Override public Holder onCreateViewHolder(ViewGroup parent, int viewType) {
    return new Holder(LayoutInflater.from(parent.getContext()).inflate(R.layout.item_concept, parent, false));
  }

  @Override public void onBindViewHolder(Holder holder, int position) {
    final Concept concept = concepts.get(position);
    holder.label.setText(concept.name() != null ? concept.name() : concept.id());
    holder.probability.setText(String.valueOf(concept.value()));
  }

  @Override public int getItemCount() {
    return concepts.size();
  }

  static final class Holder extends RecyclerView.ViewHolder {
    @BindView(R.id.testa) TextView testa;
    @BindView(R.id.testb) TextView testb;
    @BindView(R.id.testc) TextView testc;
    @BindView(R.id.label) TextView label;
    @BindView(R.id.probability) TextView probability;

    public Holder(View root) {
      super(root);
      ButterKnife.bind(this, root);
    }
  }
  public void getStores(String n) {
    String getURL;

    getURL = "https://api.goodzer.com/products/v0.1/search_stores/?query=+test2+&lat=39.0997&lng=-94.5786&radius=15&priceRange=30:120&apiKey=7dec6f710939c6b4a1f37b1b96400d1d";

    String response = null;
    BufferedReader bfr = null;
    try {
      URL url = new URL(getURL);
      HttpURLConnection conn = (HttpURLConnection) url.openConnection();
      conn.setRequestMethod("GET");
      conn.connect();
      bfr = new BufferedReader(new InputStreamReader(conn.getInputStream()));
      StringBuilder sb = new StringBuilder();
      String line = null;
      if (bfr != null) {
        while ((line = bfr.readLine()) != null) {
          // Append server response in string
          sb.append(line + " ");
        }
        response = sb.toString();

        JSONObject o = new JSONObject(response);
        JSONArray j = o.getJSONArray("locations");
        for (int k = 0; k < 3; k++) {
          JSONObject a = j.getJSONObject(k);
          testa = r.getString("url");
          testb=r.getString("name");
          testc=r.getString("address");
        }
        }
    }catch (Exception e) {
      e.getMessage();
    }
  }
}
