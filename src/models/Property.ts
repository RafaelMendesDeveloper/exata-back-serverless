import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    tipo: { type: String, required: true },
    aluguel: { type: Number, required: true },
    iptu: { type: Number, required: true },
    prazo: { type: String, required: true },
    tipoReajuste: { type: String, required: true },
    horarioVisita: { type: String, required: true },
    dormitorios: { type: Number, required: true },
    banheiros: { type: Number, required: true },
    vagasGaragem: { type: Number, required: true },
    imagens: [{ type: String, required: true }],
    area: { type: Number, required: true }, 
    ativo: { type: Boolean, default: true },
    descricao: { type: String },
    others: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Property", PropertySchema);
