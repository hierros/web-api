#define fechoPin 9
#define ftrigPin 8
#define fledPin 7

#define bechoPin 6
#define btrigPin 5
#define bledPin 4

void setup() {
  Serial.begin(9600);
  pinMode(ftrigPin, OUTPUT);
  pinMode(fechoPin, INPUT);
  pinMode(fledPin, OUTPUT);
  
  pinMode(btrigPin, OUTPUT);
  pinMode(bechoPin, INPUT);
  pinMode(bledPin, OUTPUT);
}

void loop() {
  long fdistance = 0;
  long bdistance = 0;

  fdistance = get_sensor_distance(ftrigPin, fechoPin);


  if (fdistance >= 26) {
    digitalWrite(fledPin, HIGH);
  } else {
    digitalWrite(fledPin, LOW);
  }
  delay(500);
  
  fdistance = get_sensor_distance(ftrigPin, fechoPin);

  Serial.print(fdistance);
  Serial.println(" front");

  if (bdistance >= 26) {
    digitalWrite(bledPin, HIGH);
  } else {
    digitalWrite(bledPin, LOW);
  }

  Serial.print(bdistance);
  Serial.println(" front");
  delay(500);

}

long get_sensor_distance(int trigPin, int echoPin) {
  // send a pulse on the trigger pin to initiate measurement
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // the length of the pulse on the echo pin is proportional to the distance
  long duration = pulseIn(echoPin, HIGH);
  long distance = (duration/2) / 74;
  return distance;
}

