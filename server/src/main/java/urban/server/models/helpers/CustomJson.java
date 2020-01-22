package urban.server.models.helpers;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;

public class CustomJson {
    public static class Shallow {
    }

    public static class Summary extends Shallow {
    }

    public static class ShallowSerializer extends JsonSerializer<Object> {
        @Override
        public void serialize(Object object, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException,
                JsonProcessingException {
            ObjectMapper mapper = new ObjectMapper();

            //Exclude the unrestricted parts of the serialization
            mapper.configure(MapperFeature.DEFAULT_VIEW_INCLUSION, false);
            //Exclude null values
            mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);

            //Include the view-class restricted part of the serialization
            mapper.setConfig(mapper.getSerializationConfig().withView(CustomJson.Shallow.class));

            jsonGenerator.setCodec(mapper);
            jsonGenerator.writeObject(object);

        }
    }


}
