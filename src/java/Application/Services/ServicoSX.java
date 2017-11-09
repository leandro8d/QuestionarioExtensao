/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Application.Services;

import Domain.Commom.Util;
import Domain.Commom.enumCondicao;
import Domain.Commom.enumTipoProblema;
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
     try{
         String nome,email;
            Util u = new Util();
            List<List<String>> listal = new ArrayList<List<String>>();
            JSONObject request = new JSONObject(lista);
            JSONArray arr = request.getJSONArray("lista");
            nome = request.get("nome").toString();
            email = request.get("email").toString();
            
            Gson gson = new Gson();
       
            for (int i = 0; i < arr.length(); i++) {
                listal.add(u.JsonArrayStringToList(arr.getJSONArray(i)));
            }
             
        Properties props = new Properties();
            /** Parâmetros de conexão com servidor Gmail */
            props.put("mail.smtp.host", "smtp.gmail.com");
            props.put("mail.smtp.socketFactory.port", "465");
            props.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.port", "465");

            Session session = Session.getDefaultInstance(props,
                        new javax.mail.Authenticator() {
                             protected PasswordAuthentication getPasswordAuthentication() 
                             {
                                   return new PasswordAuthentication("pucminasformulario@gmail.com", "123pucminas");
                             }
                        });
            /** Ativa Debug para sessão */
            session.setDebug(true);


                  Message message = new MimeMessage(session);
                  message.setFrom(new InternetAddress("seuemail@gmail.com")); //Remetente

                  Address[] toUser = InternetAddress //Destinatário(s)
                             .parse(email);  
                  message.setRecipients(Message.RecipientType.TO, toUser);
                  message.setSubject("Resposta Formulario respondido por "+nome);//Assunto
                  message.setText("Enviei este email utilizando JavaMail com minha conta GMail!");
                  /**Método para enviar a mensagem criada*/
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

