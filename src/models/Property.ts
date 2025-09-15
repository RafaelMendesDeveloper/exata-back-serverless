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
    favorito: { type: Boolean, default: false },
    descricao: { type: String },
    cep: { type: String, required: true },
    endereco: { type: String, required: true },
    numero: { type: String, required: true },
    complemento: { type: String },
    bairro: { type: String, required: true },
    cidade: { type: String, required: true },
    pontoReferencia: { type: String },
    latitude: { type: Number },
    longitude: { type: Number },
    criadoPor: { type: String, required: true },
    others: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Property", PropertySchema);
