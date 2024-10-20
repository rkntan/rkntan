## hi there! i'm erkan
   ☁️
```c
/*
 * =====================================
 *           Profile README
 * =====================================
 *  Author: erkan tan
 *  Role: embedded Systems Engineer
 *  Location: undefined.
 */

#include <stdio.h>
#include <inttypes.h>

// defining identity
#define NAME "Erkan"
#define OCCUPATION "Embedded Systems Engineer"
#define MASK 0xFF

// function pointers for dynamic decisions
typedef void (*info_func)(void);

// macro to suppress the obvious, reveal the necessary
#define REVEAL(f) ((*f)())

// location isn't just an address??
void intro() {
    char* location = (char*)0xDEADBEEF;
    printf("Identity:\n");
    printf(" - Name: %s\n", NAME);
    printf(" - Role: %s\n", OCCUPATION);
    printf(" - Location: 0x%" PRIxPTR "\n\n", (uintptr_t)location);
}

// Low-level skill presentation, no fluff
void skills() {
    uint8_t skills_mask = 0b0111; // Bitmask representing skills learned
    printf("Skills (bitmask: 0x%02X):\n", skills_mask);
    if (skills_mask & 0b001) {
        printf(" - C: Navigating the labyrinth of pointers and memory\n");
    }
    if (skills_mask & 0b010) {
        printf(" - HTML, CSS, JS: Weaving the digital tapestry, one thread at a time\n");
    }
    if (skills_mask & 0b100) {
        printf(" - Embedded Systems: Commanding the unseen forces of circuitry\n");
    }
    printf("\n");
}

// Focus areas, encoded in cryptic form
void focus() {
    printf("Focus Areas:\n");
    printf(" - Arch Linux: Stripping down to the essentials\n");
    printf(" - Memory management: Precision, nothing leaks\n");
    printf(" - Polish: Words are data, decode them\n\n");
}

// Hobbies, still calculated
void hobbies() {
    printf("Hobbies:\n");
    printf(" - [REDACTED]: You are not authorized to know\n");
    printf(" - Key: 0x%X-%s-%s-%s-%s\n", 0xDEADBEEF, "****", "****", "****", "****"); // Obscured key format
 
}

// Dynamic info selection, because nothing is fixed
info_func profile[] = { intro, skills, focus, hobbies };

int main() {
    // Process each part of the profile
    for (int i = 0; i < sizeof(profile) / sizeof(info_func); i++) {
        REVEAL(profile[i]);
    }

    // End without an exit, the program continues elsewhere
    return MASK ^ MASK;
}
```
<div align="center">
   <a href="https://git.io/streak-stats"><img src="https://github-readme-streak-stats.herokuapp.com?user=rkntan&theme=aura&hide_border=true&date_format=M%20j%5B%2C%20Y%5D" alt="GitHub Streak" /></a>
</div>
<div align="center">
   <img alt="Visitor Stats" src="https://widgetbite.com/stats/rkntan"/>  
</div>
