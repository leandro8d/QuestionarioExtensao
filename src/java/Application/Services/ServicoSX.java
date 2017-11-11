/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Application.Services;

import Domain.Commom.Util;
import Domain.Commom.enumCondicao;
import Domain.Commom.enumTipoProblema;
import Domain.DTO.QuestaoDTO;
import Domain.DTO.RetornoJsonDTO;
import Domain.DTO.TipoProblemaDTO;
import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import javax.mail.Address;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONObject;

/**
 *
 * @author Leandro
 */
@Path("/servicoSX")
public class ServicoSX {

    @GET
    @Path("/getCondicoes")
    @Produces({MediaType.APPLICATION_JSON})
    public JSONArray getCondicoes() {
        return new JSONArray(enumCondicao.getAllValuesString());
    }

    @GET
    @Path("/getTiposProblema")
    @Produces({MediaType.APPLICATION_JSON})
    public List<TipoProblemaDTO> getTiposProblema() {
        return enumTipoProblema.getDtoList();
    }

    @POST
    @Path("/enviarResultado")
    @Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_FORM_URLENCODED})
    @Produces(MediaType.APPLICATION_JSON)
    public void enviarResultado(String lista) {
        try {
            String nome, email;
            Util u = new Util();
            List<QuestaoDTO> listaValores = new ArrayList<QuestaoDTO>();
            List<String> listaResultado = new ArrayList<String>();
            List<String> perfis = new ArrayList<String>();

            JSONObject request = new JSONObject(lista);
            JSONArray arrValores = request.getJSONArray("lista");
            JSONArray arrResultado = request.getJSONArray("listaRepetidos");
            nome = request.get("nome").toString();
            email = request.get("email").toString();

            Gson gson = new Gson();

            for (int i = 0; i < arrValores.length(); i++) {
                listaValores.add(gson.fromJson(arrValores.getJSONObject(i).toString(), QuestaoDTO.class));
            }
            for (int i = 0; i < arrResultado.length(); i++) {
                listaResultado.add(arrResultado.getString(i));
            }

            Properties props = new Properties();
            /**
             * Parâmetros de conexão com servidor Gmail
             */
            props.put("mail.smtp.host", "smtp.gmail.com");
            props.put("mail.smtp.socketFactory.port", "465");
            props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.port", "465");

            Session session = Session.getDefaultInstance(props,
                    new javax.mail.Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication("pucminasformulario@gmail.com", "123pucminas");
                }
            });
            /**
             * Ativa Debug para sessão
             */
            session.setDebug(true);

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("pucminasformulario@gmail.com")); //Remetente

            Address[] toUser = InternetAddress //Destinatário(s)
                    .parse(email);
            message.setRecipients(Message.RecipientType.TO, toUser);
            message.setSubject("Resposta Formulario respondido por '" + nome+"', E-mail: '"+email+"'");//Assunto

            String msg;
            msg = "Letras e quantidades Selecionadas: ";
            for (QuestaoDTO q : listaValores) {
                msg += q.getLetra() + "  " + q.getTotal() + " ,";
            }
            msg += "; Letras com maior incidência: ";
            for (String p : listaResultado) {
                if(p.equals("A")){
                  msg += p+"_Mediador" + (listaResultado.size() > 1 ? " ," : ";");
                }
              else if(p.equals("B")){
                  msg += p+"_Cauteloso" + (listaResultado.size() > 1 ? " ," : ";");
              }
              else if(p.equals("C")){
                  msg += p+"_Desempenhador" + (listaResultado.size() > 1 ? " ," : ";");
              }
              else if(p.equals("D")){
                  msg += p+"_Perfeccionista" + (listaResultado.size() > 1 ? " ," : ";");
              }
              else if(p.equals(p=="E")){
                  msg += p+"_Sensibilidade" + (listaResultado.size() > 1 ? " ," : ";");
              }
              else if(p.equals("F")){
                  msg += p+"_Prestativo" + (listaResultado.size() > 1 ? " ," : ";");
              }
              else if(p.equals("G")){
                  msg += p+"_Confrontador" + (listaResultado.size() > 1 ? " ," : ";");
              }
              else if(p.equals("H")){
                  msg += p+"_Observador" + (listaResultado.size() > 1 ? " ," : ";");
              }
              else if(p.equals("I")){
                  msg += p+"_Otimista" + (listaResultado.size() > 1 ? " ," : ";");
              }
                
                
                
            }
            
            

            message.setText(msg);
            /**
             * Método para enviar a mensagem criada
             */
            Transport.send(message);

        } catch (Exception e) {
            RetornoJsonDTO retornojson = new RetornoJsonDTO();
            retornojson.setError(true);
            retornojson.setErrorMessage(e.getMessage());

        }
    }
}

//@GET
//@Path("/getListaUsuariosEventos")
//@Produces(MediaType.APPLICATION_JSON)
//public List<UsuarioDTO> getListaUsuariosEventos() {
//  IUsuarioRepository repository = new UsuarioRepository();
// List<Usuario> usuarios = repository.getUsuariosVinculadosEventoList();
//List<UsuarioDTO> listDTO = usuarios.stream().map(i -> new UsuarioDTO(i.getNome())).collect(Collectors.toList());
//return listDTO;
// }

