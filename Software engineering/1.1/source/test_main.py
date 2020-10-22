import unittest
import sys
sys.path.append("../")
print(sys.path)
import randomizer
from Plot import Plot
import numpy as np


class MyTestCase(unittest.TestCase):
    def test_size_is_equal(self):
        res = randomizer.getUniformInt(100, 0, 20)
        self.assertEqual(len(res), 100)

    def test_random_generation_with_same_seed_are_equal(self):
        np.random.seed(1)
        firstRes = randomizer.getNormalFloat(10, 0, 2)
        secondRes = randomizer.getNormalFloat(10, 0, 2)
        print(firstRes)
        print(secondRes)
        self.assertEqual(firstRes, secondRes)


if __name__ == '__main__':
    unittest.main()
