#define DATA_MAX_SIZE 32

static char endMarker = '\n';
char buffer[DATA_MAX_SIZE];

void check() {
  int index = 0;
  char received;

  memset(buffer, 32, sizeof(buffer));

  while(Serial.available() > 0) {
    received = Serial.read();
    if (received == endMarker) {
      buffer[index] = '\0';
      Serial.println("Got something from Node!");
      Serial.println(buffer);
      return;
    }

    buffer[index] = received;
    index++;

    if (index >= DATA_MAX_SIZE) {
      Serial.println("Oops! incomplete message.");
      Serial.println(buffer);
      return;
    }
  }
}

void setup() {
  Serial.begin(9600);
  delay(100);
}
void loop() {
  check();
  delay(5);
}
