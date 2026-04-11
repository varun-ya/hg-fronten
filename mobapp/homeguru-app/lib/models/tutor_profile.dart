import 'dart:io';
import 'package:flutter/material.dart';

class TutorProfile extends ChangeNotifier {
  String name = 'Ayush Soni';
  String bio = 'Mathematics & Physics tutor with 5+ years of experience. Making complex concepts simple and fun.';
  String about = 'Passionate about teaching Mathematics and Physics. I believe every student can excel with the right guidance.\n\nMy approach focuses on building strong fundamentals and problem-solving skills through real-world examples. I have helped 200+ students crack JEE and board exams.';
  String ytLink = 'https://youtu.be/G64LLtnjYlA';
  String location = 'Mumbai, India';
  File? avatar;

  final String handle = 'ayush.tutor';
  final List<String> subjects = ['Mathematics', 'Physics', 'JEE Mains', 'JEE Advanced', 'Vedic Maths', 'Board Exams'];

  List<String> languages = ['Hindi \u00b7 Native', 'English \u00b7 Professional', 'Marathi \u00b7 Good'];
  Map<String, int> pricing = {'Mathematics': 500, 'Physics': 500, 'JEE Prep': 700, 'Vedic Maths': 400};

  List<Map<String, String>> experience = [
    {'title': 'Senior Tutor', 'org': 'HomeGuru', 'period': '2023 \u2013 Present'},
    {'title': 'Freelance Tutor', 'org': 'Self-employed', 'period': '2020 \u2013 2023'},
    {'title': 'Teaching Assistant', 'org': 'Mumbai University', 'period': '2019 \u2013 2020'},
  ];

  List<Map<String, String>> education = [
    {'title': 'B.Sc Mathematics (Hons)', 'org': 'Mumbai University', 'period': '2017 \u2013 2020'},
    {'title': 'Higher Secondary (PCM)', 'org': 'DPS Mumbai', 'period': '2015 \u2013 2017'},
  ];

  void update() => notifyListeners();
}
