/* fn get_volume_of_cuboid(length: f32, width: f32, height: f32) -> f32 {
   println!("Calculating volume of cuboid with length: {}, width: {}, height: {}", length, width, height);
   length * width * height
}

fn main() {
    let length = 5.0;
    let width = 3.0;
    let height = 4.0;
    
    let volume = get_volume_of_cuboid(length, width, height);
    println!("The volume of the cuboid is: {}", volume);
} */

fn litres(time: f64) -> i32 {
    const RATE: f64 = 0.5;
    (time * RATE).floor() as i32
}

fn main() {
    let time = 11.8;
    let water_consumed = litres(time);
    println!("Water consumed in {} hours: {} litres", time, water_consumed);
}