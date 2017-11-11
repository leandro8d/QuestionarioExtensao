/*
 * Trabalho Simplex
 * Autores:Leandro;Jonathan;Yuri  * 
 */
package Domain.DTO;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author Leandro
 */
@XmlRootElement(name = "QuestaoDTO")
public class QuestaoDTO {
 

    
    public QuestaoDTO(){}
    public QuestaoDTO(String letra,int total){
   
    this.letra = letra;
    this.total = total;
    }
    @XmlElement(name="letra")
    private String letra;
    @XmlElement(name="total")
    private int total;


    public String getLetra() {
        return letra;
    }


    public void setLetra(String letra) {
        this.letra = letra;
    }

 
    public int getTotal() {
        return total;
    }

   
    public void setTotal(int total) {
        this.total = total;
    }
    
}


