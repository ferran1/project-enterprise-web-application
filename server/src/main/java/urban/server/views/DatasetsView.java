package urban.server.views;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import urban.server.models.Dataset;

import java.io.IOException;

public class DatasetsView {
    public static class Full {
    }

    public static class Shallow {}

    public static class ShallowSerializer extends JsonSerializer<Object> {

        @Override
        public void serialize(Object object, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
            ObjectMapper mapper = new ObjectMapper()
                    .configure(MapperFeature.DEFAULT_VIEW_INCLUSION, false)
                    .setSerializationInclusion(JsonInclude.Include.NON_NULL); //only serialize non_null attributes if null do not serialize

            // Fix the serialization of LocalDateTime
            mapper.registerModule(new JavaTimeModule())
                    .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);

            // Include the view-class restricted part of the serialization
            mapper.setConfig(mapper.getSerializationConfig()
                    .withView(DatasetsView.OnlyIdDataSerializer.class));

            jsonGenerator.setCodec(mapper);
            jsonGenerator.writeObject(object);

        }
    }


    public static class OnlyIdDataSerializer extends JsonSerializer<Object> {

        @Override
        public void serialize(Object object, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
            ObjectMapper mapper = new ObjectMapper()
                    .configure(MapperFeature.DEFAULT_VIEW_INCLUSION, false)
                    .setSerializationInclusion(JsonInclude.Include.NON_NULL); //only serialize non_null attributes if null do not serialize

            // Fix the serialization of LocalDateTime
            mapper.registerModule(new JavaTimeModule())
                    .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);

            // Include the view-class restricted part of the serialization
            mapper.setConfig(mapper.getSerializationConfig()
                    .withView(DatasetsView.OnlyIdDataSerializer.class));

            jsonGenerator.setCodec(mapper);
            jsonGenerator.writeObject(object);

        }
    }

    public static class IdNameSimpleUsersSerializer extends JsonSerializer<Object> {

        @Override
        public void serialize(Object object, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
            ObjectMapper mapper = new ObjectMapper()
                    .configure(MapperFeature.DEFAULT_VIEW_INCLUSION, false)
                    .setSerializationInclusion(JsonInclude.Include.NON_NULL); //only serialize non_null attributes if null do not serialize

            // Fix the serialization of LocalDateTime
            mapper.registerModule(new JavaTimeModule())
                    .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);

            // Include the view-class restricted part of the serialization
            mapper.setConfig(mapper.getSerializationConfig()
                    .withView(DatasetsView.IdNameSimpleUsersSerializer.class));

            jsonGenerator.setCodec(mapper);
            jsonGenerator.writeObject(object);

        }
    }

    public static class IdNameSimpleUsersOrganisationsSerializer extends JsonSerializer<Object> {

        @Override
        public void serialize(Object object, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
            ObjectMapper mapper = new ObjectMapper()
                    .configure(MapperFeature.DEFAULT_VIEW_INCLUSION, false)
                    .setSerializationInclusion(JsonInclude.Include.NON_NULL); //only serialize non_null attributes if null do not serialize

            // Fix the serialization of LocalDateTime
            mapper.registerModule(new JavaTimeModule())
                    .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);

            // Include the view-class restricted part of the serialization
            mapper.setConfig(mapper.getSerializationConfig()
                    .withView(IdNameSimpleUsersOrganisationsSerializer.class));

            jsonGenerator.setCodec(mapper);
            jsonGenerator.writeObject(object);

        }
    }

    public static class FullWithoutUser extends JsonSerializer<Object> {

        @Override
        public void serialize(Object object, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
            ObjectMapper mapper = new ObjectMapper()
                    .configure(MapperFeature.DEFAULT_VIEW_INCLUSION, false)
                    .setSerializationInclusion(JsonInclude.Include.NON_NULL); //only serialize non_null attributes if null do not serialize

            // Fix the serialization of LocalDateTime
            mapper.registerModule(new JavaTimeModule())
                    .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);

            // Include the view-class restricted part of the serialization
            mapper.setConfig(mapper.getSerializationConfig()
                    .withView(DatasetsView.FullWithoutUser.class));

            jsonGenerator.setCodec(mapper);
            jsonGenerator.writeObject(object);

        }
    }

    public static class FullWithoutOrganisation extends JsonSerializer<Object> {

        @Override
        public void serialize(Object object, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
            ObjectMapper mapper = new ObjectMapper()
                    .configure(MapperFeature.DEFAULT_VIEW_INCLUSION, false)
                    .setSerializationInclusion(JsonInclude.Include.NON_NULL); //only serialize non_null attributes if null do not serialize

            // Fix the serialization of LocalDateTime
            mapper.registerModule(new JavaTimeModule())
                    .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);

            // Include the view-class restricted part of the serialization
            mapper.setConfig(mapper.getSerializationConfig()
                    .withView(DatasetsView.FullWithoutOrganisation.class));

            jsonGenerator.setCodec(mapper);
            jsonGenerator.writeObject(object);

        }
    }

}
